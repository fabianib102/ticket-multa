import React, { useState, useRef, useEffect } from "react";
import { View, Image, TouchableNativeFeedback } from "react-native";
import { Button, Icon, Input, Text } from "react-native-elements";
import firebase from '../../utils/firebase';
import * as ImagePicker from 'expo-image-picker';
import { styles } from "./AddMultaForm";
import { connect } from "react-redux";
import Loading from "../Loading";
import { onSetArticulo, onSetCodigo, onSetExtracto, onSetInciso, onSetLugar, onSetLey, onSetObservaciones, onSetFoto, onDeleteFoto, clearForm, onSetOtroExtracto, onSetUnidadesFijasMin, onSetUnidadesFijasMax } from "../../store/actions/InfraccionScreen";
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import Toast from "react-native-easy-toast";
import templateTicket from './Ticket';
import { firebaseApp } from "../../utils/firebase";
import { omit } from "lodash";
import StyledDropdown from "../StyledDropdown";

function InfraccionScreen(props) {
    const {navigation, LicenciaScreen: ls, ConductorScreen: cs, VehiculoScreen: vs, InfraccionScreen: is} = props;
    const [cargando, setCargando] = useState(false);
    const [loadingInfracciones, setLoadingInfracciones] = useState([]);
    const [infracciones, setInfracciones] = useState([]);
    const toastRef = useRef();

    const date = new Date();
    const fecha = parseInt(date.getUTCDate()) + "/" + parseInt(date.getUTCMonth() + 1) + "/" + date.getUTCFullYear();
    const hora = date.toLocaleTimeString();

    const template = templateTicket(cs, ls, vs.data, is, fecha, hora);
    const db = firebase.firestore(firebaseApp);

    useEffect(() => {
        let mounted = true;
        if (infracciones.length == 0 ) {
            setLoadingInfracciones(true);
            db.collection("infracciones")
                .get()
                .then(resp => {
                    if (mounted) {
                        const newInfracciones = [];
                        resp.forEach(i => {
                            newInfracciones.push({
                                label: i.data().extracto,
                                value: i.data().extracto,
                                articulo: i.data().articulo,
                                codigo: i.data().codigo,
                                inciso: i.data().inciso,
                                ley: i.data().ley,
                                unidadesFijasMax: i.data().unidadesFijasMax,
                                unidadesFijasMin: i.data().unidadesFijasMin
                            });
                        });
                        newInfracciones.push({
                            label: 'Otro',
                            value: 'Otro'
                        });
                        setInfracciones(newInfracciones);
                    }
                })
                .finally(() => setLoadingInfracciones(false));
            return () => (mounted = false)
        }
    }, [infracciones])

    const onInfraccionChange = newValue => {
        props.onSetExtracto(newValue.value);
        props.onSetOtroExtracto('');
        props.onSetArticulo(newValue.articulo || '');
        props.onSetCodigo(newValue.codigo || '');
        props.onSetInciso(newValue.inciso || '');
        props.onSetLey(newValue.ley || '');
        props.onSetUnidadesFijasMax(newValue.unidadesFijasMax || '');
        props.onSetUnidadesFijasMin(newValue.unidadesFijasMin || '');
    };

    // Imprimir PDF
    async function printPDF(html) {
        const { uri } = await Print.printToFileAsync({ html });
        Sharing.shareAsync(uri);
      }

    // convierte una imagen en un blob
    const uriToBlob = (uri) => {  
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = () => {
                // Devolvemos el blob
                resolve(xhr.response);
            };
            xhr.onerror = () => {
                reject(new Error('uriToBlob Falló'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', uri, true);
            xhr.send(null);  
        });
    }

    // sube un blob a firebase storage en la subcarpeta especificada con el nombre especificado
    const uploadToFirebase = (blob, folder, fileName) => {
        const path = "multas/" + folder + "/" + fileName + ".jpg";
        return new Promise((resolve, reject) => {
            var storageRef = firebase.storage().ref();
            storageRef.child(path).put(blob, {
                contentType: 'image/jpeg'
            })
            .then(snapshot => {
                storageRef.child(path).getDownloadURL()
                    .then(url => {
                        console.log("DOWNLOAD URL");
                        console.log(url);
                        resolve(url);
                    }).catch(error => {
                        console.log("ERROR EN GETDOWNLOADURL");
                        console.log(error);
                    })
                blob.close();
                // resolve(snapshot);
            })
            .catch(error => {
                console.log("ERROR AL SUBIR LA IMAGEN A STORAGE");
                reject(error);
            });
        });
    }

    // agarra un array de fotos, las manipula, las sube a storage y devuelve un array con las download url
    // ESTA ES LA FUNCION QUE NO ANDA
    const uploadMultipleFilesToFirebase = (files, folderName) => {
        let urls = [];
        return new Promise((resolve, reject) => {
            files.forEach(async (foto, index) => {
                await uriToBlob(foto.uri)
                    .then(objeto => {
                        const blob = objeto;
                        uploadToFirebase(blob, folderName, index)
                            .then(downloadURL => {
                                urls.push(downloadURL);
                                // Hardcodeo para solucionar el tema del asincronismo en el array de fotos
                                setInterval(function(){ 
                                    if(urls.length == files.length){
                                        return resolve(urls);
                                    }
                                }, 250);
                            }).catch((err) => {
                                console.log('ERROR EN UPLOADTOFIREBASE')
                                console.log(err)
                            });
                    }).catch(error => {
                        console.log("ERROR EN URITOBLOB");
                        console.log(error);
                    });
            })
        })
    }

    // guarda la multa en firebase cloud firestore
    const guardarMulta = () => {
        const date = new Date();
        setCargando(true);
        let datosTitular = {};
        if (!is.conductorNoEsTitular) {
            datosTitular = {
                titular: cs.apellido + " " + cs.nombre,
                tipoDocumento: cs.tipoDocumento,
                nroDocumento: cs.nroDocumento,
                calle: cs.calle,
                numero: cs.numero,
                piso: cs.piso,
                departamento: cs.departamento,
                codigoPostal: cs.codigoPostal,
                provincia: cs.provincia,
                localidad: cs.localidad,
                pais: cs.pais,
            }
        }
        if (vs.otraMarca) {
            firebase.firestore().collection('vehiculos').add({
                marca: vs.otraMarca,
                modelos: [vs.otroModelo]
            });
        }
        if (!vs.otraMarca && vs.otroModelo) {
            firebase.firestore().collection('vehiculos').where('marca', '==', vs.data.marca).get()
                .then(snapshot => {
                    snapshot.forEach(s => {
                        firebase.firestore().collection('vehiculos').doc(s.id).update({
                            marca: s.data().marca,
                            modelos: [...s.data().modelos, vs.otroModelo]
                        });
                    });
                });
        }
        if (is.extracto === 'Otro') {
            firebase.firestore().collection('infracciones').add({
                articulo: is.articulo,
                codigo: is.codigo,
                extracto: is.otroExtracto,
                inciso: is.inciso,
                ley: is.ley,
                unidadesFijasMax: is.unidadesFijasMax,
                unidadesFijasMin: is.unidadesFijasMin,
                // vigenciaFin: is.vigenciaFin,
                // vigenciaInicio: is.vigenciaInicio
            });
        }
        firebase.firestore().collection("multas").add({
            ubicacion: {
                fecha: date.getUTCDate() + "/" + parseInt(date.getUTCMonth() + 1) + "/" + date.getUTCFullYear(),
                hora: date.toLocaleTimeString(),
                lugar: is.lugar,
            },
            licencia: {
                ...ls,
                pais: "Argentina",
                departamento: "San Fernando",
            },
            conductor: {
                ...cs,
                pais: "Argentina",
            },
            vehiculo: {
                ...vs.data,
                ...datosTitular,
                pais: "Argentina",
            },
            infraccion: {
                ...omit(is, ['otroExtracto', 'fotos', 'conductorNoEsTitular']),
                ...(is.otroExtracto && { extracto: is.otroExtracto })
            },
            vencimientos: {
                fechaPrimerVencimiento: "",
                fechaSegundoVencimiento: ""
            },
            fotos: [],
            estado: "No resuelta",
            razon: "",
            idInspector: firebase.auth().currentUser.uid,
            idSupervisor: "",
        }).then(response => {
            if (props.InfraccionScreen.fotos.length > 0){
                uploadMultipleFilesToFirebase(props.InfraccionScreen.fotos, response.id)
                 .then(urls => {
                     console.log("URLS");
                     console.log(urls);
                     firebase.firestore().collection("multas").doc(response.id).update({
                         fotos: urls,
                     }).then(() => {
                        console.log("TODO ANDUVO SIN ERRORES");
                        setCargando(false);
                        toastRef.current.show("Multa Guardada", 1250, () => {
                            props.clearForm();
                            navigation.navigate("main-stack");
                        });
                     }).catch(error => {
                         console.log("ERROR AL UPDATEAR LA MULTA");
                         console.log(error);
                         setCargando(false);
                     });
                 }).catch(error => {
                     console.log("ERROR EN LA FUNCION RARA QUE INVENTE");
                     console.log(error);
                     setCargando(false);
                 });
            } else {
                setCargando(false);
                toastRef.current.show("Multa Guardada", 1250, () => {
                    props.clearForm();
                    navigation.navigate("main-stack");
                });
            }
}).catch(error => {
            console.log("ERROR AL CARGAR LA MULTA");
            console.log(error);
            setCargando(false);
        });
    }

    // maneja la camara
    const clickCamara = async () => {
        try {
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: false,
                allowsMultipleSelection: true,
                aspect: [4, 3],
                quality: 1,
            });
            if(!result.cancelled){
                props.onSetFoto(result)
            }
        } catch(err) {
            console.log(err)
        }
    }
  
    return (
        <View style={styles.viewForm}>
            <Text h4>Infracción</Text>

            {cargando && <Loading isVisible text="Guardando multa" />}
            
            <Input
                label="Lugar de constatación"
                placeholder="Lugar de constatación"
                value={is.lugar}
                onChange={e => props.onSetLugar(e.nativeEvent.text)}
            />

            <StyledDropdown
                label="Infracción"
                loading={loadingInfracciones}
                disabled={loadingInfracciones}
                items={infracciones}
                value={is.extracto}
                placeholder={loadingInfracciones ? 'Cargando infracciones...' : 'Seleccione una infracción'}
                onChangeItem={onInfraccionChange}
                searchable
                searchablePlaceholder="Buscar infracción"
                searchableError={() => <Text>No se encontró la infracción buscada</Text>}
            />
            {is.extracto === 'Otro' && (
                <>
                    <View style={styles.row}>
                        <View style={{ flex: 1, marginRight: 16 }}>
                            <Input
                                label="Ley"
                                placeholder="Ley"
                                keyboardType="numeric"
                                value={is.ley}
                                onChange={e => props.onSetLey(e.nativeEvent.text)}
                            />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Input
                                label="Código"
                                placeholder="Código"
                                keyboardType="numeric"
                                value={is.codigo}
                                onChange={e => props.onSetCodigo(e.nativeEvent.text)}
                            />
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={{ flex: 1, marginRight: 16 }}>
                            <Input
                                label="Artículo"
                                placeholder="Artículo"
                                keyboardType="numeric"
                                value={is.articulo}
                                onChange={e => props.onSetArticulo(e.nativeEvent.text)}
                            />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Input
                                label="Inciso"
                                placeholder="Inciso"
                                value={is.inciso}
                                onChange={e => props.onSetInciso(e.nativeEvent.text)}
                            />
                        </View>
                    </View>
                    <Input
                        label="Extracto"
                        placeholder="Extracto"
                        inputContainerStyle={styles.textArea}
                        autoCapitalize="characters"
                        multiline
                        textAlignVertical="top"
                        value={is.otroExtracto}
                        onChange={e => props.onSetOtroExtracto(e.nativeEvent.text)}
                    />
                    <View style={styles.row}>
                        <View style={{ flex: 1, marginRight: 16 }}>
                            <Input
                                label="Mínimo UF"
                                placeholder="Mínimo UF"
                                keyboardType="numeric"
                                value={is.unidadesFijasMin}
                                onChange={e => props.onSetUnidadesFijasMin(e.nativeEvent.text)}
                            />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Input
                                label="Máximo UF"
                                placeholder="Máximo UF"
                                keyboardType="numeric"
                                value={is.unidadesFijasMax}
                                onChange={e => props.onSetUnidadesFijasMax(e.nativeEvent.text)}
                            />
                        </View>
                    </View>
                </>
            )}

            <Input
                label="Observaciones"
                placeholder="Observaciones"
                inputContainerStyle={styles.textArea}
                multiline
                textAlignVertical="top"
                value={is.observaciones}
                onChange={e => props.onSetObservaciones(e.nativeEvent.text)}
            />

            <View style={styles.imageList}>
                {props.InfraccionScreen.fotos.map(dest => {
                    return (
                        <TouchableNativeFeedback key={dest.uri} onPress={() => props.onDeleteFoto(dest)}>
                            <Image source={{ uri: dest.uri }} style={styles.imageItem} />
                        </TouchableNativeFeedback>
                    )
                })}
            </View>

            <Button title="Agregar foto" containerStyle={styles.btnSend} onPress={clickCamara} />
            <Button title="Imprimir multa" containerStyle={styles.btnSend} onPress={() => printPDF(template)} />
            <View style={styles.buttonContainer}>
                <Button
                    title="Anterior"
                    onPress={() => navigation.navigate('Vehículo')}
                    icon={<Icon name="chevron-left" color="white" />}
                />
                <Button
                    title="Guardar"
                    onPress={guardarMulta}
                    icon={<Icon name="save" color="white" />}
                    iconRight
                />
            </View>
            <Toast ref={toastRef} position="center" opacity={0.9} />
        </View>
    );
}

const mapStateToProps = state => {
    return state
}

const mapDispatchToProps = dispatch => {
    return {
        onSetLugar: valueLugar => dispatch(onSetLugar(valueLugar)),
        onSetLey: valueLey => dispatch(onSetLey(valueLey)),
        onSetCodigo: valueCodigo => dispatch(onSetCodigo(valueCodigo)),
        onSetArticulo: valueArticulo => dispatch(onSetArticulo(valueArticulo)),
        onSetInciso: valueInciso => dispatch(onSetInciso(valueInciso)),
        onSetExtracto: valueExtracto => dispatch(onSetExtracto(valueExtracto)),
        onSetOtroExtracto: value => dispatch(onSetOtroExtracto(value)),
        onSetUnidadesFijasMin: value => dispatch(onSetUnidadesFijasMin(value)),
        onSetUnidadesFijasMax: value => dispatch(onSetUnidadesFijasMax(value)),
        onSetObservaciones: valueObservaciones => dispatch(onSetObservaciones(valueObservaciones)),
        onSetFoto: newFoto => dispatch(onSetFoto(newFoto)),
        onDeleteFoto: foto => dispatch(onDeleteFoto(foto)),
        clearForm: () => dispatch(clearForm()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InfraccionScreen);
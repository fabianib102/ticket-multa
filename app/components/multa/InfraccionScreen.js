import React, { useState } from "react";
import { View, Image, TouchableNativeFeedback } from "react-native";
import { Picker } from "@react-native-community/picker";
import { Button, Input, Text } from "react-native-elements";
import firebase from '../../utils/firebase';
import * as ImagePicker from 'expo-image-picker';
import { styles } from "./AddMultaForm";
import { connect } from "react-redux";
import Loading from "../Loading";
import { onSetArticulo, onSetCodigo, onSetExtracto, onSetInciso, onSetLugar, onSetMontoPrimerVencimiento, onSetMontoSegundoVencimiento, onSetObservaciones, onSetFoto, onDeleteFoto } from "../../store/actions/InfraccionScreen";

function InfraccionScreen(props) {
    const {navigation, LicenciaScreen: ls, ConductorScreen: cs, VehiculoScreen: vs, InfraccionScreen: is} = props;
    const [cargando, setCargando] = useState(false);

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
            files.map(async (foto, index) => {
                await uriToBlob(foto.uri)
                    .then(objeto => {
                        const blob = objeto;
                        uploadToFirebase(blob, folderName, index)
                            .then(downloadURL => {
                                urls = [...urls, downloadURL];
                                if (index == ((files.length) - 1)){
                                    resolve(urls);
                                }
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
        firebase.firestore().collection("multas").add({
            ubicacion: {
                fecha: date.getUTCDate() + "/" + date.getUTCMonth() + 1 + "/" + date.getUTCFullYear(),
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
                ...vs,
            },
            infraccion: {
                codigo: is.codigo,
                articulo: is.articulo,
                inciso: is.inciso,
                extracto: is.extracto,
                observaciones: is.observaciones,
            },
            vencimientos: {
                fechaPrimerVencimiento: "",
                fechaSegundoVencimiento: "",
                montoPrimerVencimiento: is.montoPrimerVencimiento,
                montoSegundoVencimiento: is.montoSegundoVencimiento,
            },
            fotos: [],
            estado: "No resuelta",
            razon: "",
            idInspector: firebase.auth().currentUser.uid,
            idSupervisor: "",
        }).then(response => {
            // esto es por ahora hasta que logre hacer andar lo de subir varias fotos
            /* uriToBlob(is.fotos[0].uri)
                .then(objeto => {
                    const blob = objeto;
                    uploadToFirebase(blob, response.id, 0)
                        .then(downloadURL => {
                            firebase.firestore().collection("multas").doc(response.id).update({
                                fotos: [downloadURL],
                            }).then(response => {
                                console.log("TODO ANDUVO SIN ERRORES");
                                // MOSTRAR UN TOOLTIP, ALERT O LO QUE SEA
                                setCargando(false);
                            }).catch(error => {
                                console.log("ERROR AL UPDATEAR LA MULTA");
                                console.log(error);
                                setCargando(false);
                            });
                        }).catch((err) => {
                            console.log('ERROR EN UPLOADTOFIREBASE')
                            console.log(err)
                        });
                }).catch(error => {
                    console.log("ERROR EN URITOBLOB");
                    console.log(error);
                }); */
            // ESTO HAY QUE HACER ANDAR
             uploadMultipleFilesToFirebase(props.InfraccionScreen.fotos, response.id)
                 .then(urls => {
                     console.log("URLS");
                     console.log(urls);
                     firebase.firestore().collection("multas").doc(response.id).update({
                         fotos: urls,
                     }).then(response => {
                         console.log("TODO ANDUVO SIN ERRORES");
                         // MOSTRAR UN TOOLTIP, ALERT O LO QUE SEA
                         setCargando(false);
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
                placeholder="Lugar de constatación"
                containerStyle={styles.input}
                onChange={e => props.onSetLugar(e.nativeEvent.text)}
            />

            <View style={{ flexDirection: "row" }}>
                <Picker
                    style={{ width: "50%" }}
                    selectedValue={is.codigo}
                    onValueChange={(itemValue, itemIndex) => props.onSetCodigo(itemValue)}
                >
                    <Picker.Item label="Código" value="" />
                    <Picker.Item label="Código 1" value="Código 1" />
                    <Picker.Item label="Código 2" value="Código 2" />
                    <Picker.Item label="Código 3" value="Código 3" />
                </Picker>

                <Picker
                    style={{ width: "50%" }}
                    selectedValue={is.articulo}
                    onValueChange={(itemValue, itemIndex) => props.onSetArticulo(itemValue)}
                >
                    <Picker.Item label="Artículo" value="" />
                    <Picker.Item label="Artículo 1" value="Artículo 1" />
                    <Picker.Item label="Artículo 2" value="Artículo 2" />
                    <Picker.Item label="Artículo 3" value="Artículo 3" />
                </Picker>
            </View>
    
            <Input
                placeholder="Inciso"
                containerStyle={styles.input}
                onChange={e => props.onSetInciso(e.nativeEvent.text)}

            />

            <Input
                placeholder="Extracto"
                containerStyle={styles.input}
                onChange={e => props.onSetExtracto(e.nativeEvent.text)}
            />

            <Input
                placeholder="Observaciones"
                inputContainerStyle={styles.textArea}
                multiline={true}
                textAlignVertical="top"
                onChange={e => props.onSetObservaciones(e.nativeEvent.text)}
            />

            <Input
                placeholder="Monto del primer vencimiento"
                containerStyle={styles.input}
                keyboardType="numeric"
                onChange={e => props.onSetMontoPrimerVencimiento(e.nativeEvent.text)}
            />

            <Input
                placeholder="Monto del segundo vencimiento"
                containerStyle={styles.input}
                keyboardType="numeric"
                onChange={e => props.onSetMontoSegundoVencimiento(e.nativeEvent.text)}
            />

            <View style={styles.imageList}>
                {props.InfraccionScreen.fotos.map(dest => {
                    return (
                        <TouchableNativeFeedback key={dest.uri} onPress={() => props.onDeleteFoto(dest)}>
                            <Image source={{uri: dest.uri}} style={styles.imageItem} />
                        </TouchableNativeFeedback>
                    )
                })}
            </View>

            <Button title="Agregar foto" containerStyle={styles.btnSend} onPress={clickCamara} />

            <View style={styles.buttonContainer}>
                <Button title="Anterior" onPress={() => navigation.navigate('Vehículo')} />
                <Button title="Guardar" onPress={guardarMulta} />
            </View>
        </View>
    );
}

const mapStateToProps = state => {
    return state
}

const mapDispatchToProps = dispatch => {
    return {
        onSetLugar: valueLugar => dispatch(onSetLugar(valueLugar)),
        onSetCodigo: valueCodigo => dispatch(onSetCodigo(valueCodigo)),
        onSetArticulo: valueArticulo => dispatch(onSetArticulo(valueArticulo)),
        onSetInciso: valueInciso => dispatch(onSetInciso(valueInciso)),
        onSetExtracto: valueExtracto => dispatch(onSetExtracto(valueExtracto)),
        onSetObservaciones: valueObservaciones => dispatch(onSetObservaciones(valueObservaciones)),
        onSetMontoPrimerVencimiento: valueMontoPrimerVencimiento => dispatch(onSetMontoPrimerVencimiento(valueMontoPrimerVencimiento)),
        onSetMontoSegundoVencimiento: valueMontoSegundoVencimiento => dispatch(onSetMontoSegundoVencimiento(valueMontoSegundoVencimiento)),
        onSetFoto: newFoto => dispatch(onSetFoto(newFoto)),
        onDeleteFoto: foto => dispatch(onDeleteFoto(foto)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InfraccionScreen);
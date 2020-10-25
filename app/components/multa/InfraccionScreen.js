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

    const guardarMulta = () => {
        const date = new Date();
        // GUARDAR PRIMERO LA MULTA
        // DESPUES GUARDAR LAS FOTOS EN STORAGE EN UNA CARPETA CUYO NOMBRE ES EL ID DE LA MULTA
        // Y DESPUES GUARDAR LAS URLS DE LAS FOTOS EN LA MULTA
        setCargando(true);
        // firebase.firestore().collection("multas").add({
        //     ubicacion: {
        //         fecha: date.toLocaleDateString(),
        //         hora: date.toLocaleTimeString(),
        //         lugar: is.lugar,
        //     },
        //     licencia: {
        //         ...ls,
        //         pais: "Argentina",
        //         departamento: "San Fernando",
        //     },
        //     conductor: {
        //         ...cs,
        //         pais: "Argentina",
        //     },
        //     vehiculo: {
        //         ...vs,
        //     },
        //     infraccion: {
        //         codigo: is.codigo,
        //         articulo: is.articulo,
        //         inciso: is.inciso,
        //         extracto: is.extracto,
        //         observaciones: is.observaciones,
        //     },
        //     vencimientos: {
        //         fechaPrimerVencimiento: "",
        //         fechaSegundoVencimiento: "",
        //         montoPrimerVencimiento: is.montoPrimerVencimiento,
        //         montoSegundoVencimiento: is.montoSegundoVencimiento,
        //     },
        //     fotos: [],
        //     estado: "No resuelta",
        //     razon: "",
        //     idInspector: firebase.auth().currentUser.uid,
        //     idSupervisor: "",
        // }).then(response => {
            let storageRef = firebase.storage().ref().child("multas");
            let fotosURL = [];
            storageRef.child("a.jpg").put(is.fotos[0])
                .then(snapshot => {
                    storageRef.child("a.jpg").getDownloadURL()
                        .then(url => {
                            console.log("DOWNLOAD URL");
                            console.log(url);
                        }).catch(error => {
                            console.log("ERROR EN DOWNLOADURL");
                            console.log(error);
                        })
                }).catch(error => {
                    console.log("ERROR EN PUT");
                    console.log(error);
                    setCargando(false);
                });
        //     setCargando(false);
        // }).catch(error => {
        //     console.log(error);
        //     setCargando(false);
        // });
    }
  
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
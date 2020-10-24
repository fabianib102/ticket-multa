import React from "react";
import { View } from "react-native";
import { Picker } from "@react-native-community/picker";
import { Button, Input } from "react-native-elements";
import firebase from '../../utils/firebase';
import * as ImagePicker from 'expo-image-picker';
import { styles } from "./AddMultaForm";

function InfraccionScreen(props) {
    const {navigation} = props;

    const guardarMulta = () => {
        console.log('INTENTO DE GUARDADO');
        firebase.firestore().collection('prueba').add({
            name: 'probando',
            email: 'probando@probando.com',
            mobile: 'alguno',
        }).then((res) => {
            console.log(res)
        });
    }
  
    const clickCamara = async () => {
        try {
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
        } catch(err) {
            console.log(err)
        }
    }
  
    // const clickGaleria = async () => {
    //     try {
    //         let result = await ImagePicker.launchImageLibraryAsync({
    //             mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //             allowsEditing: true,
    //             aspect: [4, 3],
    //             quality: 1,
    //         });
    //     } catch(err) {
    //         console.log(err)
    //     }
    // }
  
    return (
        <View style={styles.viewForm}>
            <View style={{ flexDirection: "row" }}>
                <Picker style={{ width: "0%" }}></Picker>
        
                <Picker style={{ width: "50%" }}>
                    <Picker.Item label="Articulo" value="" />
                    <Picker.Item label="Articulo 1" value="Articulo 1" />
                    <Picker.Item label="Articulo 2" value="Articulo 2" />
                    <Picker.Item label="Articulo 3" value="Articulo 3" />
                </Picker>
        
                <Picker style={{ width: "50%" }}>
                    <Picker.Item label="Código" value="" />
                    <Picker.Item label="Código 1" value="Código 1" />
                    <Picker.Item label="Código 2" value="Código 2" />
                    <Picker.Item label="Código 3" value="Código 3" />
                </Picker>
            </View>
    
            <Input placeholder="Extracto" containerStyle={styles.input} />
            <Input placeholder="Inciso" containerStyle={styles.input} />
            <Input
                placeholder="Observaciones"
                inputContainerStyle={styles.textArea}
                multiline={true}
                textAlignVertical="top"
            />

            <View style={styles.buttonContainer}>
                <Button title="Anterior" onPress={() => navigation.navigate('Vehículo')} />
                <Button title="Guardar" onPress={guardarMulta} />
            </View>
            <Button title="Cámara" containerStyle={styles.btnSend} onPress={clickCamara} />
            {/* <Button title="Galería" containerStyle={styles.btnSend} onPress={clickGaleria} /> */}
        </View>
    );
}

export default InfraccionScreen;
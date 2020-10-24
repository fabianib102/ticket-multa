import React from "react";
import { View } from "react-native";
import { Picker } from "@react-native-community/picker";
import { Button, Input, Text } from "react-native-elements";
import firebase from '../../utils/firebase';
import * as ImagePicker from 'expo-image-picker';
import { styles } from "./AddMultaForm";
import { connect } from "react-redux";
import { onSetArticulo, onSetCodigo, onSetExtracto, onSetInciso, onSetLugar, onSetMontoPrimerVencimiento, onSetMontoSegundoVencimiento, onSetObservaciones } from "../../store/actions/InfraccionScreen";

function InfraccionScreen(props) {
    const {navigation, InfraccionScreen: is} = props;

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
  
    return (
        <View style={styles.viewForm}>
            <Text h4>Infracción</Text>

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

            <View style={styles.buttonContainer}>
                <Button title="Anterior" onPress={() => navigation.navigate('Vehículo')} />
                <Button title="Guardar" onPress={guardarMulta} />
            </View>
            <Button title="Cámara" containerStyle={styles.btnSend} onPress={clickCamara} />
        </View>
    );
}

const mapStateToProps = state => {
    console.log('%cESTADO DE INFRACCION SCREEN:' + JSON.stringify(state.InfraccionScreen), "color:green;")
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InfraccionScreen);
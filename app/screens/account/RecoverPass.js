import React, {useState, useRef} from "react";
import {StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {Input, Icon, Button} from 'react-native-elements';
import firebase from '../../utils/firebase';
import {isEmpty} from 'lodash';
import {validateEmail} from "../../utils/validation";
import Toast from "react-native-easy-toast";

export default function RecoverPass(props) {
    const [formData, setFormData] = useState(defaultFormValue());
    const [loading, setLoading] = useState(false);
    const toastRef = useRef();

    const recuperarPass = () => {
        if(isEmpty(formData.email)){
            toastRef.current.show("El campo Email es obligatorios")
        }else{
            if(!validateEmail(formData.email)){
                toastRef.current.show("El email no es correcto")
            }else{
                    setLoading(true);
                    firebase.auth().sendPasswordResetEmail(formData.email).then(function() {
                        setLoading(false);
                        toastRef.current.show("Se ha enviado un mail a la dirección indicada")
                        console.log('EMAIL ENVIADO A ' + formData.email);
                    }).catch(function(error) {
                        setLoading(false);
                        console.log(error);
                        toastRef.current.show("Ha ocurrido un error, intente nuevamente")
                    });
                }
            }
    }

    const onChange = (e, type) => {
        setFormData({...formData, [type]: e.nativeEvent.text})
    }

    return (
        <KeyboardAwareScrollView>
            <Image
                source={require("../../../assets/img/logoLogin.jpg")}
                resizeMode="contain"
                style={styles.logo}
            />
            <View style={styles.formContainer}>
                <Text style={styles.textView}>Ingrese su email para restablecer la contraseña</Text>
                <Input
                    label="Email"
                    keyboardType="email-address"
                    containerStyle={styles.inputForm}
                    onChange={e => onChange(e, "email")}
                />
                <Button
                    title="Restablecer"
                    style={styles.btnRecover}
                    onPress={recuperarPass}
                />
            </View>
            <Toast ref={toastRef} position="center" opacity={0.9} />
        </KeyboardAwareScrollView>
    );
}

function defaultFormValue(){
    return{
        email: ""
    }
}

const styles = StyleSheet.create({
    logo: {
        width: "100%",
        height: 230,
        marginTop: 20
    },
    formContainer:{
        marginTop: 30,
        flex: 1,
        width: '100%',
        paddingHorizontal: 16
    },
    textView:{
        textAlign: "center"
    },
    inputForm:{
        width: "100%",
        marginTop: 20
    },
    btnRecover:{
        marginTop: 20,
        width: "100%"
    }
  });
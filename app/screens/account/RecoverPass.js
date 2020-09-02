import React from "react";
import {StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {Input, Icon, Button} from 'react-native-elements';

export default function RecoverPass({ navigation }) {
    return (
        <KeyboardAwareScrollView>
            <Image
                source={require("../../../assets/img/logoLogin.jpg")}
                resizeMode="contain"
                style={styles.logo}
            />
            <View style={styles.formContainer}>
                <Text style={styles.textView}>Ingresar tu email para restablecer la contraseña</Text>
                <Input
                    placeholder="Email"
                    containerStyle={styles.inputForm}
                />
                <Button
                    title="Restablece"
                    style={styles.btnRecover}
                />
            </View>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    logo: {
        width: "100%",
        height: 230,
        marginTop: 20
    },
    formContainer:{
        marginTop: 30,
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
        width: "95%"
    }
  
  });
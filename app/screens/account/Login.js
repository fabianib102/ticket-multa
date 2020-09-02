import React, {useRef} from 'react';
import {StyleSheet, View, Text, Image } from 'react-native';
//import {Divider} from 'react-native-elements';
import FormLogin from '../../components/account/FormLogin';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-easy-toast";

export default function Login() {
  const toastRef = useRef();
  console.log("toastRef: ", toastRef);

  return (
    <KeyboardAwareScrollView>
      <Image
          source={require("../../../assets/img/logoLogin.jpg")}
          resizeMode="contain"
          style={styles.logo}
      />
      <View style={styles.viewContainer}>
        <FormLogin toastRef={toastRef}/>
      </View>
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </KeyboardAwareScrollView>
  );
}

function ForgotPassword(){

  const navigation = useNavigation();

  return(
    <Text style={styles.textRegister}>
      ¿Olvidaste tu Contraseña?{" "}
      <Text 
        style={styles.btnRegister}
        onPress={()=>navigation.navigate("recover")}
      >
        Recuperalo
      </Text>
    </Text>
  )
}


const styles = StyleSheet.create({
  logo: {
      width: "100%",
      height: 230,
      marginTop: 20
  },
  viewContainer:{
    marginRight: 40,
    marginLeft: 40
  },
  textRegister:{
    marginTop:15,
    marginLeft:10,
    marginRight:10
  },
  btnRegister:{
    color:"#3494d3",
    fontWeight:"bold",
  }

});
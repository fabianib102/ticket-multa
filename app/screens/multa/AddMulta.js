import React, {useRef, useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";
import * as firebase from "firebase";
import AddMultaForm from "../../components/multa/AddMultaForm";

export default function AddMulta (props){

    const { navigation } = props;
    const toastRef = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const [login, setLogin] = useState(false);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((userInfo) => {
            setLogin(userInfo);
        });
      }, []);
 
    return(
        <View>
            {login ? <AddMultaForm
                toastRef={toastRef}
                setIsLoading={setIsLoading}
                navigation={navigation}
            /> : <Text>Debes iniciar sesión</Text>}
            {/* <AddMultaForm
                toastRef={toastRef}
                setIsLoading={setIsLoading}
                navigation={navigation}
            />
            <Toast ref={toastRef} position="center" opacity={0.9} />
            <Loading isVisible={isLoading} text="Creando Nueva Multa" /> */}
        </View>
    );
}



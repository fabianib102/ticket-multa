import React, {useRef, useState} from 'react';
import {View} from 'react-native';
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";
import AddMultaForm from "../../components/multa/AddMultaForm";

export default function AddMulta (props){

    const { navigation } = props;
    const toastRef = useRef();
    const [isLoading, setIsLoading] = useState(false);
 
    return(
        <View>
            <AddMultaForm
                toastRef={toastRef}
                setIsLoading={setIsLoading}
                navigation={navigation}
            />
            <Toast ref={toastRef} position="center" opacity={0.9} />
            <Loading isVisible={isLoading} text="Creando Nueva Multa" />
        </View>
    );
}



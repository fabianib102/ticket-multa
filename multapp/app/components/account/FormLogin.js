import React, {useState} from "react";
import {StyleSheet, View, Text } from 'react-native';
import {Input, Icon, Button} from 'react-native-elements';
import {validateEmail} from "../../utils/validation";
import {size, isEmpty} from 'lodash';

export default function FormLogin(props) {

    const {toastRef} = props;

    const [showPass, setShowPass] = useState(false);
    const [formData, setFormData] = useState(defaultFormValue())

    const onSubmit = () => {
        if(isEmpty(formData.email) || isEmpty(formData.password)){
            toastRef.current.show("Todos los campos son obligatorios")
        }else{
            if(!validateEmail(formData.email)){
                toastRef.current.show("El email no es correcto")
            }else{
                if(size(formData.password) < 6){
                    toastRef.current.show("La contraseña debe ser mas de 6 caracteres")
                }else{toastRef.current.show("La contraseña debe ser mas de 6 caracteres")
                    toastRef.current.show("Ok")
                }
            }
        }
    }

    const onChange = (e, type) => {
        setFormData({...formData, [type]: e.nativeEvent.text})
    }

    return(
        <View style={styles.FormContainer}>
            <Input
                placeholder="Email"
                containerStyle={styles.InputForm}
                onChange={(e)=>onChange(e, "email")}
                rightIcon={
                    <Icon
                        type={"material-community"}
                        name="at"
                        iconStyle={styles.iconRight}
                    />
                }
            />
            <Input
                placeholder="Contraseña"
                containerStyle={styles.InputForm}
                password={true}
                secureTextEntry={showPass?false:true}
                onChange={(e)=>onChange(e, "password")}
                rightIcon={
                    <Icon
                        type={"material-community"}
                        name={showPass?"eye-off-outline":"eye-outline"}
                        iconStyle={styles.iconRight}
                        onPress={()=>setShowPass(!showPass)}
                    />
                }
            />
            <Button
                title="Ingresa"
                containerStyle={styles.btnForm}
                buttonStyle={styles.btnStyleForm}
                onPress={onSubmit}
            />
        </View>
    )

}


function defaultFormValue(){
    return{
        email: "",
        password: ""
    }
}


const styles = StyleSheet.create({
    FormContainer:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30
    },
    InputForm:{
        width:"100%",
        marginTop: 20
    },
    btnForm:{
        marginTop: 20,
        width: "95%"
    },
    btnStyleForm:{
        backgroundColor: "#3494d3"
    },
    iconRight:{
        color:"#c1c1c1"
    }
})
import React, { useState } from "react";
import { StyleSheet, View, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { size } from 'lodash';
import * as firebase from "firebase";
import { reauthenticate } from '../../utils/api';


export default function ChangePassword(props){
    const {setShowModal, toastRef} = props;
    const [showPass, setShowPass] = useState(false);
    const [formData, setFormData] = useState({
        password: "",
        newPassword: "",
        repeatNewPassword: ""
    });
    const [errors, setErrors] = useState({
        password: "",
        newPassword: "",
        repeatNewPassword: ""
    });
    const [isLoading, setIsLoading] = useState(false);

    const onChange = (e, type) => {
        setFormData({...formData, [type]: e.nativeEvent.text})
    }

    const onSubmit = async () => {
        let isSetError = true;
        let errorsTemp = {};
        setErrors({});
        if(!formData.password||!formData.newPassword||!formData.repeatNewPassword){
            errorsTemp = {
                password: !formData.password ? "La contraseña no puede estar vacia" : "",
                newPassword: !formData.newPassword ? "La contraseña no puede estar vacia" : "",
                repeatNewPassword: !formData.repeatNewPassword ? "La contraseña no puede estar vacia" : ""
            }
        }else if(formData.newPassword != formData.repeatNewPassword){
            errorsTemp = {
                newPassword: "Las contraseñas no son iguales",
                repeatNewPassword: "Las contraseñas no son iguales"
            }
        }else if(size(formData.newPassword) < 6){
            errorsTemp = {
                newPassword: "Las contraseña debe ser mayor o igual a 6 caracteres.",
                repeatNewPassword: "Las contraseña debe ser mayor o igual a 6 caracteres."
            }
        }else{
            setIsLoading(true);
            await reauthenticate(formData.password).then(async()=>{
                await firebase
                    .auth()
                    .currentUser.updatePassword(formData.newPassword)
                    .then(()=>{
                        isSetError = false;
                        setIsLoading(false);
                        setShowModal(false);
                        firebase.auth().signOut();
                    }).catch(()=>{
                        errorsTemp = {
                            other: "Error al actualizar la contraseña"
                        };
                        setIsLoading(false);
                    })

            }).catch(()=>{
                errorsTemp = {
                    password: "La contraseña no es correcta"
                }
                setIsLoading(false);
            })
        }

        isSetError && setErrors(errorsTemp);
    }

    return(
        <View style={styles.view}>
            <Input
                label="Contraseña actual"
                password
                secureTextEntry={!showPass}
                rightIcon={{
                    type: "material-community",
                    name: showPass ? "eye-off-outline" : "eye-outline",
                    color: "#c2c2c2",
                    onPress: () => setShowPass(!showPass)
                }}
                value={formData.password}
                onChange={e => onChange(e, "password")}
                errorMessage={errors.password}
            />

            <Input
                label="Nueva Contraseña"
                password
                secureTextEntry={!showPass}
                rightIcon={{
                    type: "material-community",
                    name: showPass ? "eye-off-outline" : "eye-outline",
                    color: "#c2c2c2",
                    onPress: () => setShowPass(!showPass)
                }}
                onChange={e => onChange(e, "newPassword")}
                errorMessage={errors.newPassword}
            />

            <Input
                label="Repetir Nueva Contraseña"
                password={true}
                secureTextEntry={!showPass}
                rightIcon={{
                    type: "material-community",
                    name: showPass ? "eye-off-outline" : "eye-outline",
                    color: "#c2c2c2",
                    onPress: () => setShowPass(!showPass)
                }}
                onChange={e => onChange(e, "repeatNewPassword")}
                errorMessage={errors.repeatNewPassword}
            />

            <Button
                title="Confirmar"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={isLoading}
            />

            <Text>{errors.other}</Text>

        </View>
    );
}

const styles = StyleSheet.create({
    view:{
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 10
    },
    btnContainer:{
        marginTop: 20,
        width: "100%"
    },
    btn:{
        backgroundColor: "#3494d3"
    }
})
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Main from "../screens/account/Main";
import Login from "../screens/account/Login";
import RecoverPass from '../screens/account/RecoverPass';

const Stack = createStackNavigator();

export default function MainStack(){
    return(

        <Stack.Navigator>
            <Stack.Screen
                name="main"
                component={Main}
                options={{title: "Bienvenido"}}
            />
            <Stack.Screen
                name="login"
                component={Login}
                options={{title: "Iniciar Sesión"}}
            />
            <Stack.Screen
                name="recover"
                component={RecoverPass}
                options={{title: "Recuperar Contraseña"}}
            />
        </Stack.Navigator>
    )
}
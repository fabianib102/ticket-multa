import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NewMulta from "../screens/multa/NewMulta";
import AddMulta from "../screens/multa/AddMulta";

const Stack = createStackNavigator();

export default function NewMultasStack(){
    return(

        <Stack.Navigator>
            <Stack.Screen
                name="new-multa"
                // component={NewMulta}
                component={AddMulta}
                options={{title: "Nueva Multa"}}
            />
            {/* <Stack.Screen
                name="add-multa"
                component={AddMulta}
                options={{title: "Crear Nueva Multa"}}
            /> */}
        </Stack.Navigator>
    )
}



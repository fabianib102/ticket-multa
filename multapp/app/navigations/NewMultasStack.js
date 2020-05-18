import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NewMulta from "../screens/NewMulta";

const Stack = createStackNavigator();

export default function NewMultasStack(){
    return(

        <Stack.Navigator>
            <Stack.Screen
                name="new-multa"
                component={NewMulta}
                options={{title: "Nueva Multa Stack"}}
            />
        </Stack.Navigator>
    )
}



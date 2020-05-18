import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import History from "../screens/History";
const Stack = createStackNavigator();

export default function HistoryStack(){
    return(

        <Stack.Navigator>
            <Stack.Screen
                name="history"
                component={History}
                options={{title: "Historial Stack"}}
            />
        </Stack.Navigator>
    )
}
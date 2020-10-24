import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
// import History from "../screens/History";
import ListMulta from "../screens/history/ListMulta";
const Stack = createStackNavigator();

export default function HistoryStack(){
    return(

        <Stack.Navigator>
            <Stack.Screen
                name="history"
                component={ListMulta}
                options={{title: "Historial de multas diarias"}}
            />
        </Stack.Navigator>
    )
}
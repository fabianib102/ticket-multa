import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
// import History from "../screens/History";
import ListMulta from "../screens/history/ListMulta";
import MultaScreen from "../screens/history/MultaScreen";
const Stack = createStackNavigator();

export default function HistoryStack(){
    return(

        <Stack.Navigator>
            <Stack.Screen
                name="history"
                component={ListMulta}
                options={{ title: "Historial de multas del día" }}
            />
            <Stack.Screen
                name="multa"
                component={MultaScreen}
                options={{ title: "Multa" }}
            />
        </Stack.Navigator>
    )
}
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import History from "../screens/History";
import MultaScreen from "../screens/MultaScreen";

const Stack = createStackNavigator();

export default function HistoryStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="history"
                component={History}
                options={{title: "Historial"}}
            />
            <Stack.Screen
                name="multa"
                component={MultaScreen}
                options={{title: "Multa"}}
            />
        </Stack.Navigator>
    )
}
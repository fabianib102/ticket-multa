import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import NewMultaStack from "./NewMultasStack";
import MainStack from "./MainStack";
import HistoryStack from "./HistoryStack"

const Tab = createBottomTabNavigator();

export default function Navigation({ navigation }){

    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="main-stack"
                tabBarOptions={{
                    inactiveTintColor:"#000",
                    activeTintColor:"#3494d3",
                }}
                screenOptions={({route}) => ({
                    tabBarIcon: ({color}) => screenOptions(route, color) 
                })} 
            >
                <Tab.Screen 
                    name="new-multa-stack" 
                    component={NewMultaStack}
                    options={{title: "Nueva Multa"}}
                />
                <Tab.Screen 
                    name="main-stack" 
                    component={MainStack}
                    options={{title: "Inicio"}}
                />
                <Tab.Screen 
                    name="history-stack" 
                    component={HistoryStack}
                    options={{title: "Historial"}}
                />
        </Tab.Navigator>
        </NavigationContainer>
    )

}

function screenOptions(route, color){
    let iconName;

    switch(route.name){
        case "main-stack":
            iconName = "compass-outline"
            break;
        case "history-stack":
            iconName = "history"
            break;
        case "new-multa-stack":
            iconName = "book-open"
            break;
        default:
            break;
    }

    return (
        <Icon type="material-community" name={iconName} size={22} color={color} />
    )

}
import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Icon } from "react-native-elements";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Provider } from "react-redux";
import store from "../../store";
import LicenciaScreen from "./LicenciaScreen";
import ConductorScreen from "./ConductorScreen";
import VehiculoScreen from "./VehiculoScreen";
import InfraccionScreen from "./InfraccionScreen";

const Tab = createMaterialTopTabNavigator();

export default function AddMultaForm() {
  return (
    <Provider store={store}>
      <ScrollView style={styles.scrollView}>
        <MyTabs />
      </ScrollView>
    </Provider>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator tabBarOptions={{showIcon: true, showLabel: false,}}>
      <Tab.Screen name="Licencia" component={LicenciaScreen}
        options={{ tabBarLabel: 'Licencia', tabBarIcon: () => <Icon type="material-community" name={"tooltip-account"}/>}}
      />
      <Tab.Screen name="Conductor" component={ConductorScreen} 
        options={{ tabBarLabel: 'Conductor', tabBarIcon: () => <Icon type="material-community" name={"account-details"}/>}}
      />
      <Tab.Screen name="Vehículo" component={VehiculoScreen} 
        options={{ tabBarLabel: 'Vehículo', tabBarIcon: () => <Icon type="material-community" name={"car"}/>}}
      />
      <Tab.Screen name="Infracción" component={InfraccionScreen} 
        options={{ tabBarLabel: 'Infracción', tabBarIcon: () => <Icon type="material-community" name={"marker"}/>}}
      />
    </Tab.Navigator>
  );
}



export const styles = StyleSheet.create({
  scrollView: {
    height: "100%",
  },
  viewForm: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  input: {
    marginBottom: 10,
  },
  row: {
    flex: 1,
    flexDirection: "row",
  },
  inputAddress: {
    flex: 1,
    borderColor: "#cccccc",
    marginBottom: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    marginTop: 25,
    flex: 1,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textArea: {
    height: 100,
    width: "100%",
    padding: 0,
    margin: 0,
  },
});

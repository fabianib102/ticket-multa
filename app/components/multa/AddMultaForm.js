import React, {useRef, useState} from 'react';
import {StyleSheet, View, ScrollView, Text } from 'react-native';
import {Icon,Image,Avatar,Input,Button, CheckBox} from "react-native-elements";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SelectInput from 'react-native-select-input-ios';

const Tab = createMaterialTopTabNavigator();

export default function AddMultaForm (){

    return(
        <ScrollView style={styles.scrollView}>
            <MyTabs/>
        </ScrollView>
    );
}

function MyTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Licencia" component={LicenciaScreen} />
        <Tab.Screen name="Conductor" component={ConductorScreen}/>
        <Tab.Screen name="Vehículo" component={VehiculoScreen} />
        <Tab.Screen name="Infracción" component={InfraccionScreen} />
      </Tab.Navigator>
    );
}

function LicenciaScreen (){

    const [provinceUnic, setProviceUnic] = useState(false);
    const [detained, setDetained] = useState(false);
    const options = [
        { value: "", label: 'País' },
        { value: "Argentina", label: 'Argentina' },
        { value: "Uruguay", label: 'Uruguay' }
    ]

    const onChange = (e) => {
        console.log("ASA")
    }

    return(
        <View style={styles.viewForm}>
            <Input placeholder="Licencia N°" containerStyle={styles.input}/>
            <Input placeholder="Clase" containerStyle={styles.input}/>
            <Input placeholder="País" containerStyle={styles.input}/>
            
            <SelectInput 
                value={"País"}
                options={options}
                onValueChange={e => console.log(e)}
            />


            <Input placeholder="Provincia" containerStyle={styles.input}/>
            <Input placeholder="Localidad" containerStyle={styles.input}/>

            <CheckBox title='Única Provincial' checked={provinceUnic}
                onPress={() => setProviceUnic(!provinceUnic)}
            />
            <CheckBox title='Retenida?' checked={detained}
                onPress={() => setDetained(!detained)}
            />

            <Input placeholder="Vencimiento" containerStyle={styles.input}/>
        </View>
    )
}

function ConductorScreen (){
    return(<Text>ConductorScreen</Text>)
}

function VehiculoScreen (){
    return(<Text>VehiculoScreen</Text>)
}

function InfraccionScreen (){
    return(<Text>InfraccionScreen</Text>)
}



const styles = StyleSheet.create({
    scrollView: {
        height: "100%"
    },
    viewForm:{
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10
    },
    input:{
        marginBottom: 10
    }
});


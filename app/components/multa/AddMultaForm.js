import React, { useRef, useState } from "react";
import { StyleSheet, View, ScrollView, Text, Switch } from "react-native";
import {
  Icon,
  Image,
  Avatar,
  Input,
  Button,
  CheckBox,
} from "react-native-elements";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Picker } from "@react-native-community/picker";
import { Provider } from 'react-redux';
import store from '../../store'
import LicenciaScreen from './LicenciaScreen'
import ConductorScreen from './ConductorScreen'

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
    <Tab.Navigator>
      <Tab.Screen
        name="Licencia"
        component={LicenciaScreen}
        initialParams={{ itemId: 42 }}
      />
      <Tab.Screen name="Conductor" component={ConductorScreen} />
      <Tab.Screen name="Vehículo" component={VehiculoScreen} />
      <Tab.Screen name="Infracción" component={InfraccionScreen} />
    </Tab.Navigator>
  );
}



/* function ConductorScreen({ navigation }) {
  const [surname, setSurname] = useState("");
  const [name, setName] = useState("");

  //False = Femenino, True = Masculino
  const [switchValue, setSwitchValue] = useState(false);
  const [sexValue, setSexValue] = useState("Femenino");
  const toggleSwitch = (value) => {
    setSwitchValue(value);
    setSexValue(!value ? "Masculino" : "Femenino");
    console.log("Valor del sexo: ", sexValue);
  };

  const [typeDocument, setTypeDocument] = useState("");
  const [documentValue, setDocumentValue] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [provinciaValue, setSelectedProvince] = useState("");
  const [localidadValue, setSelectedLocalidad] = useState("");
  const [streetValue, setStreetValue] = useState("");
  const [numberStreetValue, setNumberStreetValue] = useState("");
  const [appartmentValue, setAppartmentValue] = useState("");
  const [floorValue, setFloorValue] = useState("");
  const [postalCodeValue, setPostalCodeValue] = useState("");

  const onChangeValueTypeDocument = (valueType) => {
    console.log("Este es el valor del tipo de DNI: ", valueType);
    setTypeDocument(valueType);
  };

  const onChangeValueProvince = (valueProvince) => {
    console.log("Este es el valor de la provincia: ", valueProvince);
    setSelectedProvince(valueProvince);
  };

  const onChangeValueLocaly = (valueLocalidad) => {
    console.log("Este es el valor de la localidad: ", valueLocalidad);
    setSelectedLocalidad(valueLocalidad);
  };

  return (
    <View style={styles.viewForm}>
      <Input
        placeholder="Apellido"
        containerStyle={styles.input}
        onChange={(e) => setSurname(e.nativeEvent.text)}
      />
      <Input
        placeholder="Nombre"
        containerStyle={styles.input}
        onChange={(e) => setName(e.nativeEvent.text)}
      />

      <View style={styles.container}>
        <Text>{switchValue ? "Sexo: Masculino" : "Sexo: Femenino"}</Text>
        <Switch
          style={{ marginTop: 10 }}
          onValueChange={toggleSwitch}
          value={switchValue}
        />
      </View>

      <Picker
        selectedValue={typeDocument}
        onValueChange={(itemValue, itemIndex) =>
          onChangeValueTypeDocument(itemValue)
        }
      >
        <Picker.Item label="Tipo de documento" value="" />
        <Picker.Item label="DNI" value="DNI" />
        <Picker.Item label="Pasaporte" value="Pasaporte" />
        <Picker.Item label="LC" value="LC" />
        <Picker.Item label="LE" value="LE" />
      </Picker>

      <Input
        placeholder="Nro Documento"
        containerStyle={styles.inputAddress}
        onChange={(e) => setDocumentValue(e.nativeEvent.text)}
      />
      <Input
        placeholder="Fecha de Nacimiento"
        containerStyle={styles.input}
        onChange={(e) => setBirthDay(e.nativeEvent.text)}
      />

      <Picker
        selectedValue={provinciaValue}
        onValueChange={(itemValue, itemIndex) =>
          onChangeValueProvince(itemValue)
        }
      >
        <Picker.Item label="Seleccione Provincia" value="" />
        <Picker.Item label="Chaco" value="Chaco" />
        <Picker.Item label="Corrientes" value="Corrientes" />
        <Picker.Item label="Misiones" value="Misiones" />
      </Picker>

      <Picker
        selectedValue={localidadValue}
        onValueChange={(itemValue, itemIndex) => onChangeValueLocaly(itemValue)}
      >
        <Picker.Item label="Seleccione Localidad" value="" />
        <Picker.Item label="Resistencia" value="Resistencia" />
        <Picker.Item label="Barranqueras" value="Barranqueras" />
        <Picker.Item label="Vilelas" value="Vilelas" />
        <Picker.Item label="Fontana" value="Fontana" />
        <Picker.Item label="Puerto Tirol" value="Puerto Tirol" />
      </Picker>

      <Input
        placeholder="Calle"
        containerStyle={styles.input}
        onChange={(e) => setStreetValue(e.nativeEvent.text)}
      />

      <View style={styles.row}>
        <Input
          placeholder="Número"
          containerStyle={styles.inputAddress}
          onChange={(e) => setNumberStreetValue(e.nativeEvent.text)}
        />
        <Input
          placeholder="Departamento"
          containerStyle={styles.inputAddress}
          onChange={(e) => setAppartmentValue(e.nativeEvent.text)}
        />
      </View>

      <View style={styles.row}>
        <Input
          placeholder="Piso"
          containerStyle={styles.inputAddress}
          onChange={(e) => setFloorValue(e.nativeEvent.text)}
        />
        <Input
          placeholder="Cod. Postal"
          containerStyle={styles.inputAddress}
          onChange={(e) => setPostalCodeValue(e.nativeEvent.text)}
        />
      </View>
        
      <Button title="Siguente" containerStyle={styles.btnSend} onPress={() => navigation.navigate('Vehículo')}/>

    </View>
  );
} */

function VehiculoScreen({ navigation }) {
  const [brandValue, setBrandValue] = useState("");
  const [modelValue, setModelValue] = useState("");
  const [domainValue, setDomainValue] = useState("");
  const [typeValue, setTypeValue] = useState("");

  const [titularValue, setTitular] = useState(false);

  const [nameValue, setNameValue] = useState("");
  const [typeDocument, setTypeDocument] = useState("");
  const [documentValue, setDocumentValue] = useState("");
  const [streetValue, setStreetValue] = useState("");
  const [apartmentValue, setApartmentValue] = useState("");
  const [numberValue, setNumberValue] = useState("");
  const [floorValue, setFloorValue] = useState("");
  const [postalCode, setPostalCodeValue] = useState("");
  const [provinciaValue, setSelectedProvince] = useState("");
  const [localidadValue, setSelectedLocalidad] = useState("");

  const onChangeValueTypeDocument = (valueType) => {
    console.log("Este es el valor del tipo de DNI: ", valueType);
    setTypeDocument(valueType);
  };

  const onChangeValueProvince = (valueProvince) => {
    console.log("Este es el valor de la provincia: ", valueProvince);
    setSelectedProvince(valueProvince);
  };

  const onChangeValueLocaly = (valueLocalidad) => {
    console.log("Este es el valor de la localidad: ", valueLocalidad);
    setSelectedLocalidad(valueLocalidad);
  };

  return (
    <View style={styles.viewForm}>
      <Input
        placeholder="Marca"
        containerStyle={styles.input}
        onChange={(e) => setBrandValue(e.nativeEvent.text)}
      />
      <Input
        placeholder="Modelo"
        containerStyle={styles.input}
        onChange={(e) => setModelValue(e.nativeEvent.text)}
      />
      <Input
        placeholder="Dominio"
        containerStyle={styles.input}
        onChange={(e) => setDomainValue(e.nativeEvent.text)}
      />
      <Input
        placeholder="Tipo"
        containerStyle={styles.input}
        onChange={(e) => setTypeValue(e.nativeEvent.text)}
      />

      <CheckBox
        title="El conductor NO es el titular?"
        checked={titularValue}
        onPress={() => setTitular(!titularValue)}
      />

      {titularValue && (
        <View>
          <Input
            placeholder="Nombre y Apellido"
            containerStyle={styles.input}
            onChange={(e) => setNameValue(e.nativeEvent.text)}
          />

          <Picker
            selectedValue={typeDocument}
            onValueChange={(itemValue, itemIndex) =>
              onChangeValueTypeDocument(itemValue)
            }
          >
            <Picker.Item label="Tipo de documento" value="" />
            <Picker.Item label="DNI" value="DNI" />
            <Picker.Item label="Pasaporte" value="Pasaporte" />
            <Picker.Item label="LC" value="LC" />
            <Picker.Item label="LE" value="LE" />
          </Picker>

          <Input
            placeholder="Nro Documento"
            containerStyle={styles.inputAddress}
            onChange={(e) => setDocumentValue(e.nativeEvent.text)}
          />
          <Input
            placeholder="Calle"
            containerStyle={styles.inputAddress}
            onChange={(e) => setStreetValue(e.nativeEvent.text)}
          />

          <View style={styles.row}>
            <Input
              placeholder="Departamento"
              containerStyle={styles.inputAddress}
              onChange={(e) => setApartmentValue(e.nativeEvent.text)}
            />
            <Input
              placeholder="Número"
              containerStyle={styles.inputAddress}
              onChange={(e) => setNumberValue(e.nativeEvent.text)}
            />
          </View>

          <View style={styles.row}>
            <Input
              placeholder="Piso"
              containerStyle={styles.inputAddress}
              onChange={(e) => setFloorValue(e.nativeEvent.text)}
            />
            <Input
              placeholder="Código Postal"
              containerStyle={styles.inputAddress}
              onChange={(e) => setPostalCodeValue(e.nativeEvent.text)}
            />
          </View>

          <Picker
            selectedValue={provinciaValue}
            onValueChange={(itemValue, itemIndex) =>
              onChangeValueProvince(itemValue)
            }
          >
            <Picker.Item label="Seleccione Provincia" value="" />
            <Picker.Item label="Chaco" value="Chaco" />
            <Picker.Item label="Corrientes" value="Corrientes" />
            <Picker.Item label="Misiones" value="Misiones" />
          </Picker>

          <Picker
            selectedValue={localidadValue}
            onValueChange={(itemValue, itemIndex) =>
              onChangeValueLocaly(itemValue)
            }
          >
            <Picker.Item label="Seleccione Localidad" value="" />
            <Picker.Item label="Resistencia" value="Resistencia" />
            <Picker.Item label="Barranqueras" value="Barranqueras" />
            <Picker.Item label="Vilelas" value="Vilelas" />
            <Picker.Item label="Fontana" value="Fontana" />
            <Picker.Item label="Puerto Tirol" value="Puerto Tirol" />
          </Picker>
        </View>
      )}

      <Button title="Siguente" containerStyle={styles.btnSend} onPress={() => navigation.navigate('Infracción')}/>

    </View>
  );
}

function InfraccionScreen() {
  return (
    <View style={styles.viewForm}>
      <View style={{ flexDirection: "row"}}>
        <Picker style={{ width: "0%" }}></Picker>

        <Picker style={{ width: "50%" }}>
          <Picker.Item label="Articulo" value="" />
          <Picker.Item label="Articulo 1" value="Articulo 1" />
          <Picker.Item label="Articulo 2" value="Articulo 2" />
          <Picker.Item label="Articulo 3" value="Articulo 3" />
        </Picker>

        <Picker style={{ width: "50%" }}>
          <Picker.Item label="Código" value="" />
          <Picker.Item label="Código 1" value="Código 1" />
          <Picker.Item label="Código 2" value="Código 2" />
          <Picker.Item label="Código 3" value="Código 3" />
        </Picker>
      </View>

      <Input placeholder="Extracto" containerStyle={styles.input} />
      <Input placeholder="Inciso" containerStyle={styles.input} />
      <Input
        placeholder="Observaciones"
        inputContainerStyle={styles.textArea}
        multiline={true}
      />

      <Button title="Guardar" containerStyle={styles.btnSend} />
    </View>
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
  btnSend: {
    marginTop: 25,
    flex: 1,
    flexDirection: "row-reverse",
    padding: 10,
  },
  textArea: {
    height: 100,
    width: "100%",
    padding: 0,
    margin: 0,
  },
});

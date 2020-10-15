import React, {useState} from "react";
import { connect } from 'react-redux'
import { View, Text, Switch } from "react-native";
import { styles } from './AddMultaForm'
import { Input, Button } from "react-native-elements";
import { Picker } from "@react-native-community/picker";

function ConductorScreen(props) {
    // console.log(props.ConductorScreen)
    const { navigation, ConductorScreen: cs } = props

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
  
    // const [typeDocument, setTypeDocument] = useState("");
    // const [documentValue, setDocumentValue] = useState("");
    const [birthDay, setBirthDay] = useState("");
    // const [provinciaValue, setSelectedProvince] = useState("");
    // const [localidadValue, setSelectedLocalidad] = useState("");
    const [streetValue, setStreetValue] = useState("");
    const [numberStreetValue, setNumberStreetValue] = useState("");
    const [appartmentValue, setAppartmentValue] = useState("");
    const [floorValue, setFloorValue] = useState("");
    const [postalCodeValue, setPostalCodeValue] = useState("");
  
    /* const onChangeValueTypeDocument = (valueType) => {
      console.log("Este es el valor del tipo de DNI: ", valueType);
      setTypeDocument(valueType);
    }; */
  
    /* const onChangeValueProvince = (valueProvince) => {
      console.log("Este es el valor de la provincia: ", valueProvince);
      setSelectedProvince(valueProvince);
    }; */
  
    /* const onChangeValueLocaly = (valueLocalidad) => {
      console.log("Este es el valor de la localidad: ", valueLocalidad);
      setSelectedLocalidad(valueLocalidad);
    }; */
  
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
          selectedValue={cs.typeDocument}
          onValueChange={(itemValue, itemIndex) =>
            props.onChangeValueTypeDocument(itemValue)
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
          onChange={(e) => props.onSetDocumentValue(e.nativeEvent.text)}
        />
        <Input
          placeholder="Fecha de Nacimiento"
          containerStyle={styles.input}
          onChange={(e) => props.onSetBirthDay(e.nativeEvent.text)}
        />
  
        <Picker
          selectedValue={cs.provinciaValue}
          onValueChange={(itemValue, itemIndex) =>
            props.onChangeValueProvince(itemValue)
          }
        >
          <Picker.Item label="Seleccione Provincia" value="" />
          <Picker.Item label="Chaco" value="Chaco" />
          <Picker.Item label="Corrientes" value="Corrientes" />
          <Picker.Item label="Misiones" value="Misiones" />
        </Picker>
  
        <Picker
          selectedValue={cs.localidadValue}
          onValueChange={(itemValue, itemIndex) => props.onChangeValueLocaly(itemValue)}
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
  }


  const onChangeValueTypeDocument = (valueType) => {
    return {
        type: "onChangeValueTypeDocument",
        data: valueType
    }
  };

  const onChangeValueProvince = (valueProvince) => {
    return {
      type: "onChangeValueProvince",
      data: valueProvince
    }
  };

  const onChangeValueLocaly = (valueLocalidad) => {
    return {
      type: "onChangeValueLocaly",
      data: valueLocalidad
    }
  };

  const onSetDocumentValue = (valueDocumento) => {
    return {
      type: "onSetDocumentValue",
      data: valueDocumento
    }
  }

  const onSetBirthDay = (valueBDay) => {
    return {
      type: "onSetBirthDay",
      data: valueBDay
    }
  }

  const mapStateToProps = (state) => {
    console.log('%cESTADO DE CONDUCTOR SCREEN:' + JSON.stringify(state.ConductorScreen), "color:green;")
    return state
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        onChangeValueTypeDocument: (valueType) => dispatch(onChangeValueTypeDocument(valueType)),
        onChangeValueProvince: (valueProvince) => dispatch(onChangeValueProvince(valueProvince)),
        onChangeValueLocaly: (valueLocalidad) => dispatch(onChangeValueLocaly(valueLocalidad)),
        onSetDocumentValue: (valueDocumento) => dispatch(onSetDocumentValue(valueDocumento)),
        onSetBirthDay: (valueBDay) => dispatch(onSetBirthDay(valueBDay))
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(ConductorScreen)
import React from "react";
import { View } from "react-native";
import { connect } from 'react-redux'
import { styles } from './AddMultaForm'
import { Input, Button, CheckBox, Text } from "react-native-elements";
import { Picker } from "@react-native-community/picker";
import { onChangeClase, onChangeLocalidad, onChangeProvincia, onSetNumero, onSetRetenida, onSetUnicaProvincial, onSetVencimiento } from "../../store/actions/LicenciaScreen";

function LicenciaScreen(props) {
  // console.log(props.LicenciaScreen)
  const {navigation, LicenciaScreen: lic} = props
  // const [nroLicencia, setNroLicencia] = useState("");
  // const [classValue, setSelectedClass] = useState("Seleccione Clase");
  // const [provinciaValue, setSelectedProvince] = useState("Provincia");
  // const [localidadValue, setSelectedLocalidad] = useState("Localidad");
  // const [provinceUnique, setProviceUnique] = useState(false);
  // const [detained, setDetained] = useState(false);
  // const [expirationDate, setExpiratioDate] = useState("");

  /* const onChangeClase = (valueClass) => {
    console.log("Este es el valor de la clase: ", valueClass);
    setSelectedClass(valueClass);
  }; */

  // const onChangeClase = props.onChangeClase

  /* const onChangeProvincia = (valueProvince) => {
    console.log("Este es el valor de la provincia: ", valueProvince);
    setSelectedProvince(valueProvince);
  }; */

  /* const onChangeLocalidad = (valueLocalidad) => {
    console.log("Este es el valor de la localidad: ", valueLocalidad);
    setSelectedLocalidad(valueLocalidad);
  }; */

  return (
    <View style={styles.viewForm}>
      <Text h4>Licencia</Text>
      <Input
        placeholder="Número"
        keyboardType="numeric"
        containerStyle={styles.input}
        onChange={(e) => props.onSetNumero(e.nativeEvent.text)}
      />

      <Picker
        selectedValue={lic.clase}
        onValueChange={(itemValue, itemIndex) => props.onChangeClase(itemValue)}
      >
        <Picker.Item label="Clase" value="" />
        <Picker.Item label="A1" value="A1" />
        <Picker.Item label="A2" value="A2" />
        <Picker.Item label="A3" value="A3" />
        <Picker.Item label="B1" value="B1" />
        <Picker.Item label="B2" value="B2" />
        <Picker.Item label="C1" value="C1" />
        <Picker.Item label="C2" value="C2" />
        <Picker.Item label="C3" value="C3" />
        <Picker.Item label="D1" value="D1" />
        <Picker.Item label="D2" value="D2" />
        <Picker.Item label="D3" value="D3" />
        <Picker.Item label="D4" value="D4" />
        <Picker.Item label="E1" value="E1" />
        <Picker.Item label="E2" value="E2" />
        <Picker.Item label="F" value="F" />
        <Picker.Item label="G1" value="G1" />
        <Picker.Item label="G2" value="G2" />
        <Picker.Item label="G3" value="G3" />
      </Picker>

      <Picker
        selectedValue={lic.provincia}
        onValueChange={(itemValue, itemIndex) =>
          props.onChangeProvincia(itemValue)
        }
      >
        <Picker.Item label="Provincia" value="" />
        <Picker.Item label="Chaco" value="Chaco" />
        <Picker.Item label="Corrientes" value="Corrientes" />
        <Picker.Item label="Misiones" value="Misiones" />
      </Picker>

      <Picker
        selectedValue={lic.localidad}
        onValueChange={(itemValue, itemIndex) => props.onChangeLocalidad(itemValue)}
      >
        <Picker.Item label="Localidad" value="" />
        <Picker.Item label="Resistencia" value="Resistencia" />
        <Picker.Item label="Barranqueras" value="Barranqueras" />
        <Picker.Item label="Vilelas" value="Vilelas" />
        <Picker.Item label="Fontana" value="Fontana" />
        <Picker.Item label="Puerto Tirol" value="Puerto Tirol" />
      </Picker>

      <CheckBox
        title="Única Provincial"
        checked={lic.unicaProvincial}
        onPress={() => props.onSetUnicaProvincial()}
      />
      <CheckBox
        title="Retenida?"
        checked={lic.retenida}
        onPress={() => props.onSetRetenida()}
      />

      <Input
        placeholder="Vencimiento"
        containerStyle={styles.input}
        onChange={(e) => props.onSetVencimiento(e.nativeEvent.text)}
      />

      <View style={styles.buttonContainer}>
        <Button title="Anterior" disabled/>
        <Button title="Siguiente" onPress={() => navigation.navigate('Conductor')}/>
      </View>
    </View>
  );
}

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
      onChangeClase: (valueClass) => dispatch(onChangeClase(valueClass)),
      onChangeProvincia: (valueProvince) => dispatch(onChangeProvincia(valueProvince)),
      onChangeLocalidad: (valueLocalidad) => dispatch(onChangeLocalidad(valueLocalidad)),
      onSetVencimiento: (valueExpiration) => dispatch(onSetVencimiento(valueExpiration)),
      onSetNumero: (valueLicencia) => dispatch(onSetNumero(valueLicencia)),
      onSetUnicaProvincial: () => dispatch(onSetUnicaProvincial()),
      onSetRetenida: () => dispatch(onSetRetenida())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LicenciaScreen)
import React from "react";
import { View } from "react-native";
import { connect } from 'react-redux'
import { styles } from './AddMultaForm'
import { Input, Button, CheckBox } from "react-native-elements";
import { Picker } from "@react-native-community/picker";

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

  /* const onChangeValueClass = (valueClass) => {
    console.log("Este es el valor de la clase: ", valueClass);
    setSelectedClass(valueClass);
  }; */

  // const onChangeValueClass = props.onChangeValueClass

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
        placeholder="Licencia N°"
        containerStyle={styles.input}
        onChange={(e) => props.onSetNroLicencia(e.nativeEvent.text)}
      />

      <Picker
        selectedValue={lic.classValue}
        onValueChange={(itemValue, itemIndex) => props.onChangeValueClass(itemValue)}
      >
        <Picker.Item label="Seleccione Clase" value="" />
        <Picker.Item label="A1" value="A1" />
        <Picker.Item label="A2" value="A2" />
        <Picker.Item label="A3" value="A3" />
        <Picker.Item label="B1" value="B1" />
        <Picker.Item label="B2" value="B2" />
        <Picker.Item label="C1" value="C1" />
        <Picker.Item label="C2" value="C2" />
        <Picker.Item label="C3" value="C3" />
        {/* //TODO: Falta completar */}
      </Picker>

      <Picker
        selectedValue={lic.provinciaValue}
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
        selectedValue={lic.localidadValue}
        onValueChange={(itemValue, itemIndex) => props.onChangeValueLocaly(itemValue)}
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
        checked={lic.provinceUnique}
        onPress={() => props.onSetProviceUnique()}
      />
      <CheckBox
        title="Retenida?"
        checked={lic.detained}
        onPress={() => props.onSetDetained()}
      />

      <Input
        placeholder="Vencimiento"
        containerStyle={styles.input}
        onChange={(e) => props.onSetExpirationDate(e.nativeEvent.text)}
      />

      <Button title="Siguente" containerStyle={styles.btnSend} onPress={() => navigation.navigate('Conductor')}/>
    </View>
  );
}

const onChangeValueClass = (valueClass) => {
  return {
    type: "onChangeValueClass",
    data: valueClass
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

const onSetExpirationDate = (valueExpiration) => {
  return {
    type: "onSetExpirationDate",
    data: valueExpiration
  }
}

const onSetNroLicencia = (valueLicencia) => {
  return {
    type: "onSetNroLicencia",
    data: valueLicencia
  }
}

const onSetProviceUnique = () => {
  return {
    type: "onSetProviceUnique"
  }
}

const onSetDetained = () => {
  return {
    type: "onSetDetained"
  }
}

const mapStateToProps = (state) => {
  console.log('%cESTADO DE LICENCIA SCREEN:' + JSON.stringify(state.LicenciaScreen), "color:yellow;")
  // console.log('%cESTADO DE CONDUCTOR SCREEN:' + JSON.stringify(state.ConductorScreen), "color:green;")
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
      onChangeValueClass: (valueClass) => dispatch(onChangeValueClass(valueClass)),
      onChangeValueProvince: (valueProvince) => dispatch(onChangeValueProvince(valueProvince)),
      onChangeValueLocaly: (valueLocalidad) => dispatch(onChangeValueLocaly(valueLocalidad)),
      onSetExpirationDate: (valueExpiration) => dispatch(onSetExpirationDate(valueExpiration)),
      onSetNroLicencia: (valueLicencia) => dispatch(onSetNroLicencia(valueLicencia)),
      onSetProviceUnique: () => dispatch(onSetProviceUnique()),
      onSetDetained: () => dispatch(onSetDetained())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LicenciaScreen)
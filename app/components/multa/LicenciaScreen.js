import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { connect } from 'react-redux'
import { styles } from './AddMultaForm'
import { Input, Button, CheckBox, Text } from "react-native-elements";
import { Picker } from "@react-native-community/picker";
import { onChangeClase, onChangeLocalidad, onChangeProvincia, onSetNumero, onSetRetenida, onSetUnicaProvincial, onSetVencimiento } from "../../store/actions/LicenciaScreen";
import DropDownPicker from "react-native-dropdown-picker"

const provinciasAPI = require("../../../assets/provincias.json");
const localidadesAPI = require("../../../assets/localidades.json");

function LicenciaScreen(props) {
  const {navigation, LicenciaScreen: lic} = props
  const [provincias, setProvincias] = useState(provinciasAPI);
  const [localidades, setLocalidades] = useState(localidadesAPI);
  const [localidad, setLocalidad] = useState([]);


  // carga las provincias mediante la API
  useEffect(() => {
    if (lic.provincia === '')
      return

    var p = provincias.filter(p => p.nombre == lic.provincia)[0]
    setLocalidad(
      localidades[p.id]
      .map(l => {
          return l.nombre;
      })
    )
  }, [lic.provincia]);




  return (
    <View style={styles.viewForm}>
      <Text h4>Licencia</Text>
      <Input
        placeholder="Número"
        keyboardType="numeric"
        containerStyle={styles.input}
        value={lic.numero}
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

      {/* <Picker
        selectedValue={lic.provincia}
        onValueChange={(itemValue, itemIndex) =>
          props.onChangeProvincia(itemValue)
        }
      >
        <Picker.Item label="Provincia" value="" />
        <Picker.Item label="Chaco" value="Chaco" />
        <Picker.Item label="Corrientes" value="Corrientes" />
        <Picker.Item label="Misiones" value="Misiones" />
      </Picker> */}

        <DropDownPicker
          items={provincias.map(provincia => ({
              label: provincia.nombre,
              value: provincia.nombre
          }))}
          defaultValue={lic.provincia}
          placeholder="Provincia"
          style={styles.dropDownPicker}
          itemStyle={{justifyContent: 'flex-start'}}
          onChangeItem={item => props.onChangeProvincia(item.value)}
          searchable={true}
          searchablePlaceholder="Buscar provincia"
          searchableError={() => <Text>No se encontró la provincia buscada</Text>}
        />

        <DropDownPicker
          items={localidad.map(loc => ({
              label: loc,
              value: loc
          }))}
          defaultValue={lic.localidad}
          placeholder="Localidad"
          style={styles.dropDownPicker}
          itemStyle={{justifyContent: 'flex-start'}}
          onChangeItem={item => props.onChangeLocalidad(item.value)}
          searchable={true}
          searchablePlaceholder="Buscar localidad"
          searchableError={() => <Text>No se encontró la localidad buscada</Text>}
        />

      {/* <Picker
        selectedValue={lic.localidad}
        onValueChange={(itemValue, itemIndex) => props.onChangeLocalidad(itemValue)}
      >
        <Picker.Item label="Localidad" value="" />
        <Picker.Item label="Resistencia" value="Resistencia" />
        <Picker.Item label="Barranqueras" value="Barranqueras" />
        <Picker.Item label="Vilelas" value="Vilelas" />
        <Picker.Item label="Fontana" value="Fontana" />
        <Picker.Item label="Puerto Tirol" value="Puerto Tirol" />
      </Picker> */}

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
        value={lic.vencimiento}
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
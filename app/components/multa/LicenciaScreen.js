import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { styles } from "./AddMultaForm";
import { Input, Button, CheckBox, Text } from "react-native-elements";
import { Picker } from "@react-native-community/picker";
import {
  onChangeClase,
  onChangeLocalidad,
  onChangeProvincia,
  onSetNumeroLic,
  onSetRetenida,
  onSetUnicaProvincial,
  onSetVencimiento,
} from "../../store/actions/LicenciaScreen";
import DatePicker from "react-native-datepicker";
import StyledDropdown from "../StyledDropdown";

const provinciasAPI = require("../../../assets/provincias.json");
const localidadesAPI = require("../../../assets/localidades.json");

function LicenciaScreen(props) {
  const { navigation, LicenciaScreen: lic } = props;
  const [provincias] = useState(provinciasAPI);
  const [localidades] = useState(localidadesAPI);
  const [localidad, setLocalidad] = useState([]);
  const [dateOut, setDateOut] = useState(new Date());

  // carga las provincias mediante la API
  useEffect(() => {
    if (lic.provincia === "") {
      setLocalidad("");
      return;
    }

    var p = provincias.filter(p => p.nombre == lic.provincia)[0];
    setLocalidad(
      localidades[p.id].map(l => {
        return l.nombre;
      })
    );
  }, [lic.provincia]);

  return (
    <View style={styles.viewForm}>
      <Text h4>Licencia</Text>
      <Input
        placeholder="Número"
        keyboardType="numeric"
        containerStyle={styles.input}
        value={lic.numero}
        onChange={e => props.onSetNumeroLic(e.nativeEvent.text)}
      />

      <Picker
        selectedValue={lic.clase}
        onValueChange={itemValue => props.onChangeClase(itemValue)}
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

      {provincias.length != 0 && (
        <>
          <StyledDropdown
            items={provincias.map((provincia) => ({
              label: provincia.nombre,
              value: provincia.nombre,
            }))}
            placeholder="Provincia"
            onChangeItem={(item) => props.onChangeProvincia(item.value)}
            searchable={true}
            searchablePlaceholder="Buscar provincia"
            searchableError={() => (
              <Text>No se encontró la provincia buscada</Text>
            )}
          />
          {localidad.length != 0 && (
            <StyledDropdown
              items={localidad.map((loc) => ({
                label: loc,
                value: loc,
              }))}
              placeholder="Localidad"
              onChangeItem={(item) => props.onChangeLocalidad(item.value)}
              searchable={true}
              searchablePlaceholder="Buscar localidad"
              searchableError={() => (
                <Text>No se encontró la localidad buscada</Text>
              )}
            />
          )}
        </>
      )}

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

      <View>
        <Text h5>Vencimiento</Text>
        <DatePicker
          style={{textAlignVertical: "center",textAlign: "center",}}
          date={dateOut}
          format="DD/MM/YYYY"
          onDateChange={(date) => {
            setDateOut(date);
            props.onSetVencimiento(date);
          }}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Anterior" disabled />
        <Button
          title="Siguiente"
          onPress={() => navigation.navigate("Conductor")}
        />
      </View>
    </View>
  );
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeClase: (valueClass) => dispatch(onChangeClase(valueClass)),
    onChangeProvincia: (valueProvince) =>
      dispatch(onChangeProvincia(valueProvince)),
    onChangeLocalidad: (valueLocalidad) =>
      dispatch(onChangeLocalidad(valueLocalidad)),
    onSetVencimiento: (valueExpiration) =>
      dispatch(onSetVencimiento(valueExpiration)),
    onSetNumeroLic: (valueLicencia) => dispatch(onSetNumeroLic(valueLicencia)),
    onSetUnicaProvincial: () => dispatch(onSetUnicaProvincial()),
    onSetRetenida: () => dispatch(onSetRetenida()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LicenciaScreen);

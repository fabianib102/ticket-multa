import React from "react";
import { connect } from 'react-redux'
import { View } from "react-native";
import { styles } from './AddMultaForm'
import { Input, Button, Text } from "react-native-elements";
import { Picker } from "@react-native-community/picker";
import { onChangeValueLocalidad, onChangeValueProvincia, onChangeValueTipoDocumento, onSetApellido, onSetCalle, onSetCodigoPostal, onSetDepartamento, onSetFechaNacimiento, onSetNombre, onSetNroDocumento, onSetNumero, onSetPiso, onSetSexo } from "../../store/actions/ConductorScreen";

function ConductorScreen(props) {
    const { navigation, ConductorScreen: cs } = props

    return (
      <View style={styles.viewForm}>
        <Text h4>Conductor</Text>
        <Input
          placeholder="Apellido"
          containerStyle={styles.input}
          onChange={(e) => props.onSetApellido(e.nativeEvent.text)}
        />
        <Input
          placeholder="Nombre"
          containerStyle={styles.input}
          onChange={(e) => props.onSetNombre(e.nativeEvent.text)}
        />
  
        <Picker
          selectedValue={cs.sexo}
          onValueChange={(itemValue, itemIndex) =>
            props.onSetSexo(itemValue)
          }
        >
          <Picker.Item label="Sexo" value="" />
          <Picker.Item label="Masculino" value="Masculino" />
          <Picker.Item label="Femenino" value="Femenino" />
        </Picker>
  
        <Picker
          selectedValue={cs.tipoDocumento}
          onValueChange={(itemValue, itemIndex) =>
            props.onChangeValueTipoDocumento(itemValue)
          }
        >
          <Picker.Item label="Tipo de documento" value="" />
          <Picker.Item label="DNI" value="DNI" />
          <Picker.Item label="Pasaporte" value="Pasaporte" />
          <Picker.Item label="LC" value="LC" />
          <Picker.Item label="LE" value="LE" />
        </Picker>
  
        <Input
          placeholder="Número de documento"
          keyboardType="numeric"
          containerStyle={styles.inputAddress}
          onChange={(e) => props.onSetNroDocumento(e.nativeEvent.text)}
        />
        <Input
          placeholder="Fecha de nacimiento"
          containerStyle={styles.input}
          onChange={(e) => props.onSetFechaNacimiento(e.nativeEvent.text)}
        />
  
        <Picker
          selectedValue={cs.provincia}
          onValueChange={(itemValue, itemIndex) =>
            props.onChangeValueProvincia(itemValue)
          }
        >
          <Picker.Item label="Provincia" value="" />
          <Picker.Item label="Chaco" value="Chaco" />
          <Picker.Item label="Corrientes" value="Corrientes" />
          <Picker.Item label="Misiones" value="Misiones" />
        </Picker>
  
        <Picker
          selectedValue={cs.localidad}
          onValueChange={(itemValue, itemIndex) => props.onChangeValueLocalidad(itemValue)}
        >
          <Picker.Item label="Localidad" value="" />
          <Picker.Item label="Resistencia" value="Resistencia" />
          <Picker.Item label="Barranqueras" value="Barranqueras" />
          <Picker.Item label="Vilelas" value="Vilelas" />
          <Picker.Item label="Fontana" value="Fontana" />
          <Picker.Item label="Puerto Tirol" value="Puerto Tirol" />
        </Picker>
  
        <Input
          placeholder="Calle"
          containerStyle={styles.input}
          onChange={(e) => props.onSetCalle(e.nativeEvent.text)}
        />
  
        <View style={styles.row}>
          <Input
            placeholder="Número"
            keyboardType="numeric"
            containerStyle={styles.inputAddress}
            onChange={(e) => props.onSetNumero(e.nativeEvent.text)}
          />
          <Input
            placeholder="Departamento"
            containerStyle={styles.inputAddress}
            onChange={(e) => props.onSetDepartamento(e.nativeEvent.text)}
          />
        </View>
  
        <View style={styles.row}>
          <Input
            placeholder="Piso"
            containerStyle={styles.inputAddress}
            onChange={(e) => props.onSetPiso(e.nativeEvent.text)}
          />
          <Input
            placeholder="Código postal"
            containerStyle={styles.inputAddress}
            onChange={(e) => props.onSetCodigoPostal(e.nativeEvent.text)}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Anterior"  onPress={() => navigation.navigate('Licencia')}/>  
          <Button title="Siguiente"  onPress={() => navigation.navigate('Vehículo')}/>
        </View>
      </View>
    );
}

const mapStateToProps = (state) => {
    return state
}
  
const mapDispatchToProps = (dispatch) => {
    return {
        onChangeValueTipoDocumento: (valueType) => dispatch(onChangeValueTipoDocumento(valueType)),
        onChangeValueProvincia: (valueProvince) => dispatch(onChangeValueProvincia(valueProvince)),
        onChangeValueLocalidad: (valueLocalidad) => dispatch(onChangeValueLocalidad(valueLocalidad)),
        onSetApellido: (valueApellido) => dispatch(onSetApellido(valueApellido)),
        onSetNombre: (valueNombre) => dispatch(onSetNombre(valueNombre)),
        onSetSexo: (valueSexo) => dispatch(onSetSexo(valueSexo)),
        onSetNroDocumento: (valueDocumento) => dispatch(onSetNroDocumento(valueDocumento)),
        onSetFechaNacimiento: (valueBDay) => dispatch(onSetFechaNacimiento(valueBDay)),
        onSetCalle: (streetValue) => dispatch(onSetCalle(streetValue)),
        onSetNumero: (streetNumber) => dispatch(onSetNumero(streetNumber)),
        onSetDepartamento: (apartmentValue) => dispatch(onSetDepartamento(apartmentValue)),
        onSetPiso: (floorValue) => dispatch(onSetPiso(floorValue)),
        onSetCodigoPostal: (postalValue) => dispatch(onSetCodigoPostal(postalValue))
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ConductorScreen)
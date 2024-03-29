import React, { useEffect, useState } from "react";
import { connect } from 'react-redux'
import { View } from "react-native";
import { styles } from './AddMultaForm'
import { Input, Button, Text } from "react-native-elements";
import { Picker } from "@react-native-community/picker";
import { onChangeValueLocalidad, onChangeValueProvincia, onChangeValueTipoDocumento, onSetApellido, onSetCalle, onSetCodigoPostal, onSetDepartamento, onSetFechaNacimiento, onSetNombre, onSetNroDocumento, onSetNumero, onSetPiso, onSetSexo } from "../../store/actions/ConductorScreen";
import DropDownPicker from "react-native-dropdown-picker";

const provinciasAPI = require("../../../assets/provincias.json");
const localidadesAPI = require("../../../assets/localidades.json");

function ConductorScreen(props) {
    const { navigation, ConductorScreen: cs } = props
    const [provincias, setProvincias] = useState(provinciasAPI);
    const [localidades, setLocalidades] = useState(localidadesAPI);
    const [localidad, setLocalidad] = useState([]);

    // carga las provincias mediante la API
    useEffect(() => {
        if (cs.provincia === '') return
        var p = provincias.filter(p => p.nombre == cs.provincia)[0]
        setLocalidad(localidades[p.id].map(l => {
            return l.nombre;
        }));
    }, [cs.provincia]);

    return (
        <View style={styles.viewForm}>
            <Text h4>Conductor</Text>
            <Input
                placeholder="Apellido"
                containerStyle={styles.input}
                value={cs.apellido}
                onChange={(e) => props.onSetApellido(e.nativeEvent.text)}
            />
            <Input
                placeholder="Nombre"
                containerStyle={styles.input}
                value={cs.nombre}
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
                value={cs.nroDocumento}
                onChange={(e) => props.onSetNroDocumento(e.nativeEvent.text)}
            />
            <Input
                placeholder="Fecha de nacimiento"
                containerStyle={styles.input}
                value={cs.fechaNacimiento}
                onChange={(e) => props.onSetFechaNacimiento(e.nativeEvent.text)}
            />
            <View style={{ zIndex: 2}}>
                <DropDownPicker
                    items={provincias.map(provincia => ({
                        label: provincia.nombre,
                        value: provincia.nombre
                    }))}
                    defaultValue={cs.provincia}
                    placeholder="Provincia"
                    style={styles.dropDownPicker}
                    itemStyle={{justifyContent: 'flex-start'}}
                    onChangeItem={item => props.onChangeValueProvincia(item.value)}
                    searchable={true}
                    searchablePlaceholder="Buscar provincia"
                    searchableError={() => <Text>No se encontró la provincia buscada</Text>}
                />
            </View>
    
            <View style={{ zIndex: 1}}>
                <DropDownPicker
                    items={localidad.map(loc => ({
                        label: loc,
                        value: loc
                    }))}
                    defaultValue={cs.localidad}
                    placeholder="Localidad"
                    style={styles.dropDownPicker}
                    itemStyle={{justifyContent: 'flex-start'}}
                    onChangeItem={item => props.onChangeValueLocalidad(item.value)}
                    searchable={true}
                    searchablePlaceholder="Buscar localidad"
                    searchableError={() => <Text>No se encontró la localidad buscada</Text>}
                />
            </View>
    
            <Input
                placeholder="Calle"
                containerStyle={styles.input}
                value={cs.calle}
                onChange={(e) => props.onSetCalle(e.nativeEvent.text)}
            />
    
            <View style={styles.row}>
                <Input
                    placeholder="Número"
                    keyboardType="numeric"
                    containerStyle={styles.inputAddress}
                    value={cs.numero}
                    onChange={(e) => props.onSetNumero(e.nativeEvent.text)}
                />
                <Input
                    placeholder="Departamento"
                    containerStyle={styles.inputAddress}
                    value={cs.departamento}
                    onChange={(e) => props.onSetDepartamento(e.nativeEvent.text)}
                />
            </View>
    
            <View style={styles.row}>
                <Input
                    placeholder="Piso"
                    keyboardType='numeric'
                    containerStyle={styles.inputAddress}
                    value={cs.piso}
                    onChange={(e) => props.onSetPiso(e.nativeEvent.text)}
                />
                <Input
                    placeholder="Código postal"
                    containerStyle={styles.inputAddress}
                    value={cs.codigoPostal}
                    onChange={(e) => props.onSetCodigoPostal(e.nativeEvent.text)}
                />
            </View>

            <View style={styles.buttonContainer}>
                <Button title="Anterior" onPress={() => navigation.navigate('Licencia')}/>  
                <Button title="Siguiente" onPress={() => navigation.navigate('Vehículo')}/>
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
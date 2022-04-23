import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { View, } from "react-native";
import { Input, Text, Button, CheckBox } from "react-native-elements";
import { Picker } from "@react-native-community/picker";
import DropDownPicker from "react-native-dropdown-picker"
import { styles } from "./AddMultaForm";
import { onSetVehiculoRetenido, onChangeTipo, onSetCalle, onSetCodigoPostal, onSetDepartamento, onSetDominio, onSetLocalidad, onSetMarca, onSetModelo, onSetNroDocumento, onSetNumero, onSetPais, onSetPiso, onSetProvincia, onChangeTipoDocumento, onSetTitular, getVehiculos, onSetOtraMarca, onSetOtroModelo } from "../../store/actions/VehiculoScreen";
import { setConductorNoEsTitular } from "../../store/actions/InfraccionScreen";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import carTypes from "../../../assets/carTypes";

import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";



const provinciasAPI = require("../../../assets/provincias.json");
const localidadesAPI = require("../../../assets/localidades.json");

function VehiculoScreen(props) {
    const dispatch = useDispatch();
    // const loadingVehiculos = useSelector(state => state.VehiculoScreen.loadingVehiculos);
    // const vehiculos = useSelector(state => state.VehiculoScreen.vehiculos);

    const {navigation, VehiculoScreen: vs, InfraccionScreen: is} = props;
    const [modelos, setModelos] = useState([]);
    const [provincias, setProvincias] = useState(provinciasAPI);
    const [localidades, setLocalidades] = useState(localidadesAPI);
    const [localidad, setLocalidad] = useState([]);
    const [vehiculos, setVehiculos] = useState([]);
    const [loadingVehiculos, setLoadingVehiculos] = useState(false);

    const db = firebase.firestore(firebaseApp);


    useEffect(() => {

        let mounted = true;

        console.log("========= PRE useEffect v", vehiculos.length)
        if (vehiculos.length == 0 ) {
            db.collection("vehiculos")
                .get()
                .then((resp) => {
                    if (mounted) {
                        const ve = [];
                        resp.forEach(v => {
                            ve.push({
                                label: v.data().marca,
                                value: v.data().marca,
                                modelos: [
                                    ...v.data().modelos.map(m => ({
                                        label: m,
                                        value: m
                                    })),
                                    { label: 'Otro', value: 'Otro' }
                                ]
                            });
                        });
                        ve.push({
                            label: 'Otro',
                            value: 'Otro',
                            modelos: [{ label: 'Otro', value: 'Otro' }]
                        });
                        setVehiculos(ve);
                        console.log("=========useEffect v", vehiculos.length)
                    } else { null }
                })
            return () => (mounted = false)
        } else {null}
    }, [vehiculos])


        // dispatch(getVehiculos());

    // carga las provincias mediante la API
    useEffect(() => {
        if (vs.data.provincia === '') return
        var p = provincias.filter(p => p.nombre == vs.data.provincia)[0]
        setLocalidad(localidades[p.id].map(l => {
            return l.nombre;
        }));
    }, [vs.data.provincia]);

    const onMarcaChange = newValue => {
        props.onSetMarca(newValue.value);
        props.onSetModelo('');
        props.onSetOtraMarca('');
        setModelos(newValue.modelos ?? []);
    };

    const onModeloChange = newValue => {
        props.onSetModelo(newValue.value);
        props.onSetOtroModelo('');
    };

    console.log("================================================ PRE BUILD")
    console.log("=========Vehiculo Props", vs)
    console.log("=========LENGGGGGG Vehiculos", vehiculos.length)
    console.log("=========LENGGGGGG carTypes", carTypes.length)

    return (
        <View style={styles.viewForm}>
        {(vehiculos.length != 0) && ( 
            <>
            <Text h4>Vehículo</Text>
            <Input
                placeholder="Dominio"
                autoCapitalize="characters"
                containerStyle={styles.input}
                value={vs.data.dominio}
                onChange={e => dispatch(onSetDominio(e.nativeEvent.text))}
            />
                <DropDownPicker
                    loading={loadingVehiculos}
                    disabled={loadingVehiculos}
                    items={vehiculos}
                    value={vs.data.marca}
                    placeholder="Marca"
                    style={styles.dropDownPicker}
                    itemStyle={{ justifyContent: 'flex-start' }}
                    onChangeItem={onMarcaChange}
                    searchable
                    searchablePlaceholder="Buscar marca"
                    searchableError={() => <Text>No se encontró la marca buscada</Text>}
                />
            {vs.data.marca === 'Otro' && (
                <Input
                    placeholder="Ingrese la marca"
                    autoCapitalize="words"
                    containerStyle={styles.input}
                    value={vs.otraMarca}
                    onChange={e => props.onSetOtraMarca(e.nativeEvent.text)}
                />
            )}
                <DropDownPicker
                    items={modelos}
                    placeholder="Modelo"
                    style={styles.dropDownPicker}
                    itemStyle={{ justifyContent: 'flex-start' }}
                    onChangeItem={onModeloChange}
                    searchable
                    searchablePlaceholder="Buscar modelo"
                    searchableError={() => <Text>No se encontró el modelo buscado</Text>}
                />
            {vs.data.modelo === 'Otro' && (
                <Input
                    placeholder="Ingrese el modelo"
                    autoCapitalize="words"
                    containerStyle={styles.input}
                    value={vs.otroModelo}
                    onChange={e => props.onSetOtroModelo(e.nativeEvent.text)}
                />
            )}

            {(carTypes.length != 0) && (
                <DropDownPicker
                    items={carTypes}
                    placeholder="Tipo"
                    style={styles.dropDownPicker}
                    itemStyle={{justifyContent: 'flex-start'}}
                    onChangeItem={item => props.onChangeTipo(item.value)}
                    searchable={true}
                    searchablePlaceholder="Buscar tipo"
                    searchableError={() => <Text>No se encontró el tipo buscado</Text>}
                />
            )}

            <CheckBox
                title="Vehículo retenido?"
                checked={vs.data.vehiculoRetenido}
                onPress={() => dispatch(onSetVehiculoRetenido())}
            />

            <CheckBox
                title="El conductor NO es el titular"
                checked={is.conductorNoEsTitular}
                onPress={() => dispatch(setConductorNoEsTitular(!is.conductorNoEsTitular))}
            />

            {is.conductorNoEsTitular && (
                <View>
                    <Input
                        placeholder="Nombre y apellido"
                        autoCapitalize="words"
                        containerStyle={styles.input}
                        value={vs.data.titular}
                        onChange={e => dispatch(onSetTitular(e.nativeEvent.text))}
                    />

                    <Picker
                        selectedValue={vs.data.tipoDocumento}
                        onValueChange={itemValue => dispatch(onChangeTipoDocumento(itemValue))}
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
                        value={vs.data.nroDocumento}
                        onChange={e => dispatch(onSetNroDocumento(e.nativeEvent.text))}
                    />
                    <Input
                        placeholder="Calle"
                        autoCapitalize="words"
                        containerStyle={styles.inputAddress}
                        value={vs.data.calle}
                        onChange={e => dispatch(onSetCalle(e.nativeEvent.text))}
                    />

                    <View style={styles.row}>
                        <Input
                            placeholder="Número"
                            keyboardType="numeric"
                            containerStyle={styles.inputAddress}
                            value={vs.data.numero}
                            onChange={e => dispatch(onSetNumero(e.nativeEvent.text))}
                        />
                        <Input
                            placeholder="Departamento"
                            containerStyle={styles.inputAddress}
                            value={vs.data.departamento}
                            onChange={e => dispatch(onSetDepartamento(e.nativeEvent.text))}
                        />
                    </View>

                    <View style={styles.row}>
                        <Input
                            placeholder="Piso"
                            containerStyle={styles.inputAddress}
                            value={vs.data.piso}
                            onChange={e => dispatch(onSetPiso(e.nativeEvent.text))}
                        />
                        <Input
                            placeholder="Código Postal"
                            containerStyle={styles.inputAddress}
                            value={vs.data.codigoPostal}
                            onChange={e => dispatch(onSetCodigoPostal(e.nativeEvent.text))}
                        />
                    </View>

                    <DropDownPicker
                        items={provincias.map(provincia => ({
                            label: provincia.nombre,
                            value: provincia.nombre
                        }))}
                        defaultValue={vs.data.provincia}
                        placeholder="Provincia"
                        style={styles.dropDownPicker}
                        itemStyle={{justifyContent: 'flex-start'}}
                        onChangeItem={item => dispatch(onSetProvincia(item.value))}
                        searchable={true}
                        searchablePlaceholder="Buscar provincia"
                        searchableError={() => <Text>No se encontró la provincia buscada</Text>}
                    />
            
                    <DropDownPicker
                        items={localidad.map(loc => ({
                            label: loc,
                            value: loc
                        }))}
                        defaultValue={vs.data.localidad}
                        placeholder="Localidad"
                        style={styles.dropDownPicker}
                        itemStyle={{justifyContent: 'flex-start'}}
                        onChangeItem={item => dispatch(onSetLocalidad(item.value))}
                        searchable={true}
                        searchablePlaceholder="Buscar localidad"
                        searchableError={() => <Text>No se encontró la localidad buscada</Text>}
                    />
                </View>
            )}

            <View style={styles.buttonContainerVS}>
                <Button title="Anterior" onPress={() => navigation.navigate('Conductor')} />
                <Button title="Siguiente" onPress={() => navigation.navigate('Infracción')} />
            </View>
        </>
        )
        }
        </View>
    )
    
}

const mapStateToProps = state => {
    return state
}

const mapDispatchToProps = dispatch => {
    return {
        onSetMarca: newValue => dispatch(onSetMarca(newValue)),
        onSetModelo: newValue => dispatch(onSetModelo(newValue)),
        onSetOtraMarca: newValue => dispatch(onSetOtraMarca(newValue)),
        onSetOtroModelo: newValue => dispatch(onSetOtroModelo(newValue)),
        onChangeTipo: newValue => dispatch(onChangeTipo(newValue))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VehiculoScreen);

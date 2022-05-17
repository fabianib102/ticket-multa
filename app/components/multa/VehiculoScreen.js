import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { View, } from "react-native";
import { Input, Text, Button, CheckBox } from "react-native-elements";
import { Picker } from "@react-native-community/picker";
import { styles } from "./AddMultaForm";
import { onSetVehiculoRetenido, onChangeTipo, onSetCalle, onSetCodigoPostal, onSetDepartamento, onSetDominio, onSetLocalidad, onSetMarca, onSetModelo, onSetNroDocumento, onSetNumero, onSetPiso, onSetProvincia, onChangeTipoDocumento, onSetTitular, onSetOtraMarca, onSetOtroModelo } from "../../store/actions/VehiculoScreen";
import { setConductorNoEsTitular } from "../../store/actions/InfraccionScreen";
import { useDispatch } from "react-redux";
import carTypes from "../../../assets/carTypes";

import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import StyledDropdown from "../StyledDropdown";

const provinciasAPI = require("../../../assets/provincias.json");
const localidadesAPI = require("../../../assets/localidades.json");

function VehiculoScreen(props) {
    const dispatch = useDispatch();

    const {navigation, VehiculoScreen: vs, InfraccionScreen: is} = props;
    const [modelos, setModelos] = useState([]);
    const [provincias] = useState(provinciasAPI);
    const [localidades] = useState(localidadesAPI);
    const [localidad, setLocalidad] = useState([]);
    const [vehiculos, setVehiculos] = useState([]);
    const [loadingVehiculos] = useState(false);

    const db = firebase.firestore(firebaseApp);

    useEffect(() => {
        let mounted = true;
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
                    } else { null }
                })
            return () => (mounted = false)
        } else {null}
    }, [vehiculos])

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

    return (
        <View style={styles.viewForm}>
            <Text h4>Vehículo</Text>
            <Input
                label="Dominio"
                placeholder="Dominio"
                autoCapitalize="characters"
                value={vs.data.dominio}
                onChange={e => dispatch(onSetDominio(e.nativeEvent.text))}
            />
            <StyledDropdown
                label="Marca"
                loading={loadingVehiculos}
                disabled={loadingVehiculos}
                items={vehiculos}
                value={vs.data.marca}
                placeholder={loadingVehiculos ? 'Cargando marcas...' : 'Seleccione una marca'}
                onChangeItem={onMarcaChange}
                searchable
                searchablePlaceholder="Buscar marca"
                searchableError={() => <Text>No se encontró la marca buscada</Text>}
            />
            {vs.data.marca === 'Otro' && (
                <Input
                    label="Nueva marca"
                    placeholder="Ingrese la marca"
                    autoCapitalize="words"
                    value={vs.otraMarca}
                    onChange={e => props.onSetOtraMarca(e.nativeEvent.text)}
                />
            )}
            <StyledDropdown
                label="Modelo"
                loading={loadingVehiculos}
                disabled={loadingVehiculos}
                items={modelos}
                placeholder={loadingVehiculos ? 'Cargando modelos...' : 'Seleccione un modelo'}
                onChangeItem={onModeloChange}
                searchable
                searchablePlaceholder="Buscar modelo"
                searchableError={() => <Text>No se encontró el modelo buscado</Text>}
            />
            {vs.data.modelo === 'Otro' && (
                <Input
                    label="Nuevo modelo"
                    placeholder="Ingrese el modelo"
                    autoCapitalize="words"
                    value={vs.otroModelo}
                    onChange={e => props.onSetOtroModelo(e.nativeEvent.text)}
                />
            )}

            {carTypes.length != 0 && (
                <StyledDropdown
                    label="Tipo"
                    items={carTypes}
                    placeholder="Seleccione un tipo"
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
                        label="Nombre y apellido"
                        placeholder="Nombre y apellido"
                        autoCapitalize="words"
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
                        label="Número de documento"
                        placeholder="Número de documento"
                        keyboardType="numeric"
                        value={vs.data.nroDocumento}
                        onChange={e => dispatch(onSetNroDocumento(e.nativeEvent.text))}
                    />
                    <Input
                        label="Calle"
                        placeholder="Calle"
                        autoCapitalize="words"
                        value={vs.data.calle}
                        onChange={e => dispatch(onSetCalle(e.nativeEvent.text))}
                    />

                    <View style={styles.row}>
                        <View style={{ flex: 1, marginRight: 16 }}>
                            <Input
                                label="Número"
                                placeholder="Número"
                                keyboardType="numeric"
                                value={vs.data.numero}
                                onChange={e => dispatch(onSetNumero(e.nativeEvent.text))}
                            />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Input
                                label="Departamento"
                                placeholder="Departamento"
                                value={vs.data.departamento}
                                onChange={e => dispatch(onSetDepartamento(e.nativeEvent.text))}
                            />
                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={{ flex: 1, marginRight: 16 }}>
                            <Input
                                label="Piso"
                                placeholder="Piso"
                                value={vs.data.piso}
                                onChange={e => dispatch(onSetPiso(e.nativeEvent.text))}
                            />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Input
                                label="Código postal"
                                placeholder="Código Postal"
                                value={vs.data.codigoPostal}
                                onChange={e => dispatch(onSetCodigoPostal(e.nativeEvent.text))}
                            />
                        </View>
                    </View>

                    <StyledDropdown
                        label="Provincia"
                        items={provincias.map(provincia => ({
                            label: provincia.nombre,
                            value: provincia.nombre
                        }))}
                        defaultValue={vs.data.provincia}
                        placeholder="Seleccione una provincia"
                        onChangeItem={item => dispatch(onSetProvincia(item.value))}
                        searchable={true}
                        searchablePlaceholder="Buscar provincia"
                        searchableError={() => <Text>No se encontró la provincia buscada</Text>}
                    />
            
                    <StyledDropdown
                        label="Localidad"
                        items={localidad.map(loc => ({
                            label: loc,
                            value: loc
                        }))}
                        defaultValue={vs.data.localidad}
                        placeholder="Seleccione una localidad"
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
        </View>
    );
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

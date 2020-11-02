import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { View, } from "react-native";
import { Input, Text, Button, CheckBox } from "react-native-elements";
import { Picker } from "@react-native-community/picker";
import DropDownPicker from "react-native-dropdown-picker"
import { styles } from "./AddMultaForm";
import { onChangeTipo, onSetCalle, onSetCodigoPostal, onSetDepartamento, onSetDominio, onSetLocalidad, onSetMarca, onSetModelo, onSetNroDocumento, onSetNumero, onSetPais, onSetPiso, onSetProvincia, onChangeTipoDocumento, onSetTitular } from "../../store/actions/VehiculoScreen";

const modelosDeAutos = require("../../../assets/car-models.json");

function VehiculoScreen(props) {
    const {navigation, VehiculoScreen: vs} = props;
    const [conductorNoEsTitular, setConductorNoEsTitular] = useState(false);
    const [marcas, setMarcas] = useState(modelosDeAutos.map(item => item.brand));
    const [modelos, setModelos] = useState([]);

    // carga los modelos de la marca elegida
    useEffect(() => {
        let modelos = modelosDeAutos.find(item => item.brand === vs.marca);
        if (modelos !== undefined) {
            setModelos(modelos.models);
        }
    }, [vs.marca]);

    return (
        <View style={styles.viewForm}>
            <Text h4>Vehículo</Text>
            <Input
                placeholder="Dominio"
                autoCapitalize="characters"
                containerStyle={styles.input}
                onChange={(e) => props.onSetDominio(e.nativeEvent.text)}
            />

            <DropDownPicker
                items={marcas.map(marca => ({
                    label: marca,
                    value: marca
                }))}
                defaultValue={vs.marca}
                placeholder="Marca"
                style={styles.dropDownPicker}
                itemStyle={{justifyContent: 'flex-start'}}
                onChangeItem={item => props.onSetMarca(item.value)}
                searchable={true}
                searchablePlaceholder="Buscar marca"
                searchableError={() => <Text>No se encontró la marca buscada</Text>}
            />

            <DropDownPicker
                items={modelos.map(modelo => ({
                    label: modelo,
                    value: modelo
                }))}
                defaultValue={vs.modelo}
                placeholder="Modelo"
                style={styles.dropDownPicker}
                itemStyle={{justifyContent: 'flex-start'}}
                onChangeItem={item => props.onSetModelo(item.value)}
                searchable={true}
                searchablePlaceholder="Buscar modelo"
                searchableError={() => <Text>No se encontró el modelo buscado</Text>}
            />

            {/* https://www.dnrpa.gov.ar/fabricantes/info/CODIGO_DEL_AUTOMOTOR.pdf */}
            {/* algunos nombres cambie porque eran cualquier cosa */}
            {/* ej: sedan 3 puertas (que no existe) por hatchback 3 puertas (que si existe) */}
            <DropDownPicker
                items={[
                    {label: "Sedán 2 puertas", value: "Sedán 2 puertas"},
                    {label: "Sedán 4 puertas", value: "Sedán 4 puertas"},
                    {label: "Hatchback 3 puertas", value: "Hatchback 3 puertas"},
                    {label: "Hatchback 5 puertas", value: "Hatchback 5 puertas"},
                    {label: "Rural 2/3 puertas", value: "Rural 2/3 puertas"},
                    {label: "Rural 4/5 puertas", value: "Rural 4/5 puertas"},
                    {label: "Coupé", value: "Coupé"},
                    {label: "Descapotable", value: "Descapotable"},
                    {label: "Limusina", value: "Limusina"},
                    {label: "Todo terreno", value: "Todo terreno"},
                    {label: "Familiar", value: "Familiar"},
                    {label: "Pick up", value: "Pick up"},
                    {label: "Furgoneta/Utilitario", value: "Furgoneta/Utilitario"},
                    {label: "Furgón", value: "Furgón"},
                    {label: "Camión", value: "Camión"},
                    {label: "Chasis sin cabina", value: "Chasis sin cabina"},
                    {label: "Chasis con cabina", value: "Chasis con cabina"},
                    {label: "Tractor de carretera", value: "Tractor de carretera"},
                    {label: "Casa rodante con motor", value: "Casa rodante con motor"},
                    {label: "Casa rodante sin motor", value: "Casa rodante sin motor"},
                    {label: "Acoplado", value: "Acoplado"},
                    {label: "Semirremolque", value: "Semirremolque"},
                    {label: "Motor remolcado", value: "Motor remolcado"},
                    {label: "Carretón", value: "Carretón"},
                    {label: "Minibus", value: "Minibus"},
                    {label: "Midibus", value: "Midibus"},
                    {label: "Ómnibus", value: "Ómnibus"}
                ]}
                defaultValue={vs.tipo}
                placeholder="Tipo"
                // containerStyle={{height: 40}}
                style={styles.dropDownPicker}
                itemStyle={{justifyContent: 'flex-start'}}
                // dropDownStyle={{backgroundColor: '#fafafa'}}
                onChangeItem={item => props.onChangeTipo(item.value)}
                searchable={true}
                searchablePlaceholder="Buscar tipo"
                // searchablePlaceholderTextColor="gray"
                // seachableStyle={{}}
                searchableError={() => <Text>No se encontró el tipo buscado</Text>}
            />

            <CheckBox
                title="El conductor NO es el titular"
                checked={conductorNoEsTitular}
                onPress={() => setConductorNoEsTitular(!conductorNoEsTitular)}
            />

            {conductorNoEsTitular && (
                <View>
                    <Input
                        placeholder="Nombre y apellido"
                        autoCapitalize="words"
                        containerStyle={styles.input}
                        onChange={(e) => props.onSetTitular(e.nativeEvent.text)}
                    />

                    <Picker
                        selectedValue={vs.tipoDocumento}
                        onValueChange={(itemValue, itemIndex) => props.onChangeTipoDocumento(itemValue)}
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
                        placeholder="Calle"
                        autoCapitalize="words"
                        containerStyle={styles.inputAddress}
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
                            placeholder="Código Postal"
                            containerStyle={styles.inputAddress}
                            onChange={(e) => props.onSetCodigoPostal(e.nativeEvent.text)}
                        />
                    </View>

                    <Picker
                        selectedValue={vs.pais}
                        onValueChange={(itemValue, itemIndex) => props.onSetPais(itemValue)}
                    >
                        <Picker.Item label="País" value="" />
                        <Picker.Item label="Argentina" value="Argentina" />
                        <Picker.Item label="Paraguay" value="Paraguay" />
                        <Picker.Item label="Uruguay" value="Uruguay" />
                        <Picker.Item label="Brasil" value="Brasil" />
                        <Picker.Item label="Chile" value="Chile" />
                    </Picker>

                    <Picker
                        selectedValue={vs.provincia}
                        onValueChange={(itemValue, itemIndex) => props.onSetProvincia(itemValue)}
                    >
                        <Picker.Item label="Provincia" value="" />
                        <Picker.Item label="Chaco" value="Chaco" />
                        <Picker.Item label="Corrientes" value="Corrientes" />
                        <Picker.Item label="Misiones" value="Misiones" />
                    </Picker>

                    <Picker
                        selectedValue={vs.localidad}
                        onValueChange={(itemValue, itemIndex) => props.onSetLocalidad(itemValue)}
                    >
                        <Picker.Item label="Localidad" value="" />
                        <Picker.Item label="Resistencia" value="Resistencia" />
                        <Picker.Item label="Barranqueras" value="Barranqueras" />
                        <Picker.Item label="Vilelas" value="Vilelas" />
                        <Picker.Item label="Fontana" value="Fontana" />
                        <Picker.Item label="Puerto Tirol" value="Puerto Tirol" />
                    </Picker>
                </View>
            )}

            <View style={styles.buttonContainer}>
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
        onSetDominio: valueDominio => dispatch(onSetDominio(valueDominio)),
        onSetMarca: valueMarca => dispatch(onSetMarca(valueMarca)),
        onSetModelo: valueModelo => dispatch(onSetModelo(valueModelo)),
        onChangeTipo: valueTipo => dispatch(onChangeTipo(valueTipo)),
        onSetTitular: valueTitular => dispatch(onSetTitular(valueTitular)),
        onChangeTipoDocumento: valueTipoDocumento => dispatch(onChangeTipoDocumento(valueTipoDocumento)),
        onSetNroDocumento: valueNroDocumento => dispatch(onSetNroDocumento(valueNroDocumento)),
        onSetCalle: valueCalle => dispatch(onSetCalle(valueCalle)),
        onSetNumero: valueNumero => dispatch(onSetNumero(valueNumero)),
        onSetPiso: valuePiso => dispatch(onSetPiso(valuePiso)),
        onSetDepartamento: valueDepartamento => dispatch(onSetDepartamento(valueDepartamento)),
        onSetCodigoPostal: valueCodigoPostal => dispatch(onSetCodigoPostal(valueCodigoPostal)),
        onSetLocalidad: valueLocalidad => dispatch(onSetLocalidad(valueLocalidad)),
        onSetProvincia: valueProvincia => dispatch(onSetProvincia(valueProvincia)),
        onSetPais: valuePais => dispatch(onSetPais(valuePais)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VehiculoScreen);

import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, ActivityIndicator, View } from "react-native";
import { Card, Image, Text } from "react-native-elements";
import * as firebase from "firebase";
import 'firebase/firestore';

const MultaScreen = props => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [multa, setMulta] = useState(null);

    // trae los datos de la multa desde firebase
    useEffect(() => {
        setLoading(true);
        setError(false);
        const {id} = props.route.params;
        firebase.firestore().collection("multas").doc(id).get()
            .then(doc => {
                setMulta(doc.data());
                setLoading(false);
                setError(false);
            }).catch(error => {
                console.log(error);
                setLoading(false);
                setError(error);
            });
    }, [props.route.params.id]);
    
    let componentToRender;
    if (loading) {
        componentToRender = <ActivityIndicator size="large" color="#3494d3" />;
    }
    else if (error) {
        componentToRender = <Text>Ocurrió un error. Intente nuevamente</Text>;
    }
    else {
        componentToRender = (
            <ScrollView style={estilos.details}>
                <Card title="Ubicación" style={estilos.card}>
                    <Text style={estilos.titulo}>Fecha</Text>
                    <Text>{multa.ubicacion.fecha || '-'}</Text>
                    <Text style={estilos.titulo}>Hora</Text>
                    <Text>{multa.ubicacion.hora || '-'}</Text>
                    <Text style={estilos.titulo}>Lugar de constatación</Text>
                    <Text>{multa.ubicacion.lugar || '-'}</Text>
                </Card>
                <Card title="Licencia">
                    <Text style={estilos.titulo}>Número de licencia</Text>
                    <Text>{multa.licencia.numero || '-'}</Text>
                    <Text style={estilos.titulo}>Única provincial</Text>
                    <Text>{multa.licencia.unicaProvincial || '-'}</Text>
                    <Text style={estilos.titulo}>Clase</Text>
                    <Text>{multa.licencia.clase || '-'}</Text>
                    <Text style={estilos.titulo}>Vencimiento</Text>
                    <Text>{multa.licencia.vencimiento || '-'}</Text>
                    <Text style={estilos.titulo}>Licencia retenida</Text>
                    <Text>{multa.licencia.retenida || '-'}</Text>
                    <Text style={estilos.titulo}>País</Text>
                    <Text>{multa.licencia.pais || '-'}</Text>
                    <Text style={estilos.titulo}>Provincia</Text>
                    <Text>{multa.licencia.provincia || '-'}</Text>
                    <Text style={estilos.titulo}>Departamento</Text>
                    <Text>{multa.licencia.departamento || '-'}</Text>
                    <Text style={estilos.titulo}>Localidad</Text>
                    <Text>{multa.licencia.localidad || '-'}</Text>
                </Card>
                <Card title="Conductor">
                    <Text style={estilos.titulo}>Apellido</Text>
                    <Text>{multa.conductor.apellido || '-'}</Text>
                    <Text style={estilos.titulo}>Nombre</Text>
                    <Text>{multa.conductor.nombre || '-'}</Text>
                    <Text style={estilos.titulo}>Sexo</Text>
                    <Text>{multa.conductor.sexo || '-'}</Text>
                    <Text style={estilos.titulo}>Fecha de nacimiento</Text>
                    <Text>{multa.conductor.fechaNacimiento || '-'}</Text>
                    <Text style={estilos.titulo}>Tipo de documento</Text>
                    <Text>{multa.conductor.tipoDocumento || '-'}</Text>
                    <Text style={estilos.titulo}>Número de documento</Text>
                    <Text>{multa.conductor.nroDocumento || '-'}</Text>
                    <Text style={estilos.titulo}>Calle</Text>
                    <Text>{multa.conductor.calle || '-'}</Text>
                    <Text style={estilos.titulo}>Número</Text>
                    <Text>{multa.conductor.numero || '-'}</Text>
                    <Text style={estilos.titulo}>Piso</Text>
                    <Text>{multa.conductor.piso || '-'}</Text>
                    <Text style={estilos.titulo}>Departamento</Text>
                    <Text>{multa.conductor.departamento || '-'}</Text>
                    <Text style={estilos.titulo}>Localidad</Text>
                    <Text>{multa.conductor.localidad || '-'}</Text>
                    <Text style={estilos.titulo}>Código postal</Text>
                    <Text>{multa.conductor.codigoPostal || '-'}</Text>
                    <Text style={estilos.titulo}>Provincia</Text>
                    <Text>{multa.conductor.provincia || '-'}</Text>
                    <Text style={estilos.titulo}>País</Text>
                    <Text>{multa.conductor.pais || '-'}</Text>
                </Card>
                <Card title="Vehículo">
                    <Text style={estilos.titulo}>Dominio</Text>
                    <Text>{multa.vehiculo.dominio || '-'}</Text>
                    <Text style={estilos.titulo}>Marca</Text>
                    <Text>{multa.vehiculo.marca || '-'}</Text>
                    <Text style={estilos.titulo}>Modelo</Text>
                    <Text>{multa.vehiculo.modelo || '-'}</Text>
                    <Text style={estilos.titulo}>Tipo</Text>
                    <Text>{multa.vehiculo.tipo || '-'}</Text>
                    <Text style={estilos.titulo}>Titular</Text>
                    <Text>{multa.vehiculo.titular || '-'}</Text>
                    <Text style={estilos.titulo}>Tipo de documento</Text>
                    <Text>{multa.vehiculo.tipoDocumento || '-'}</Text>
                    <Text style={estilos.titulo}>Número de documento</Text>
                    <Text>{multa.vehiculo.nroDocumento || '-'}</Text>
                    <Text style={estilos.titulo}>Calle</Text>
                    <Text>{multa.vehiculo.calle || '-'}</Text>
                    <Text style={estilos.titulo}>Número</Text>
                    <Text>{multa.vehiculo.numero || '-'}</Text>
                    <Text style={estilos.titulo}>Piso</Text>
                    <Text>{multa.vehiculo.piso || '-'}</Text>
                    <Text style={estilos.titulo}>Departamento</Text>
                    <Text>{multa.vehiculo.departamento || '-'}</Text>
                    <Text style={estilos.titulo}>Localidad</Text>
                    <Text>{multa.vehiculo.localidad || '-'}</Text>
                    <Text style={estilos.titulo}>Código postal</Text>
                    <Text>{multa.vehiculo.codigoPostal || '-'}</Text>
                    <Text style={estilos.titulo}>Provincia</Text>
                    <Text>{multa.vehiculo.provincia || '-'}</Text>
                    <Text style={estilos.titulo}>País</Text>
                    <Text>{multa.vehiculo.pais || '-'}</Text>
                </Card>
                <Card title="Infracción">
                    <Text style={estilos.titulo}>Código de infracción</Text>
                    <Text>{multa.infraccion.codigo || '-'}</Text>
                    <Text style={estilos.titulo}>Artículo nº</Text>
                    <Text>{multa.infraccion.articulo || '-'}</Text>
                    <Text style={estilos.titulo}>Inciso nº</Text>
                    <Text>{multa.infraccion.inciso || '-'}</Text>
                    <Text style={estilos.titulo}>Extracto</Text>
                    <Text>{multa.infraccion.extracto || '-'}</Text>
                    <Text style={estilos.titulo}>Observaciones</Text>
                    <Text>{multa.infraccion.observaciones || '-'}</Text>
                </Card>
                <Card title="Pruebas fotográficas">
                    <View style={estilos.imageContainer}>
                        {multa.fotos.length === 0 && (
                            <Text>No ha adjuntado ninguna fotografía.</Text>
                        )}
                        {multa.fotos.map(foto => (
                            <Image
                                source={{ uri: foto }}
                                style={estilos.image}
                                PlaceholderContent={<ActivityIndicator />}
                            />
                        ))}
                    </View>
                </Card>
                <Card title="Vencimientos">
                    <Text style={estilos.titulo}>Primer vencimiento</Text>
                    <Text>{multa.vencimientos.fechaPrimerVencimiento || '-'}</Text>
                    <Text style={estilos.titulo}>Segundo vencimiento</Text>
                    <Text>{multa.vencimientos.fechaSegundoVencimiento || '-'}</Text>
                    <Text style={estilos.titulo}>Mínimo de Unidades Fijas</Text>
                    <Text>{multa.infraccion.unidadesFijasMin || '-'}</Text>
                    <Text style={estilos.titulo}>Máximo de Unidades Fijas</Text>
                    <Text>{multa.infraccion.unidadesFijasMax || '-'}</Text>
                </Card>
                <Card title="Estado">
                    <Text style={estilos.titulo}>Estado de la multa</Text>
                    <Text>{multa.estado || '-'}</Text>
                    <Text style={estilos.titulo}>Razón</Text>
                    <Text>{multa.razon || '-'}</Text>
                    <Text style={estilos.titulo}>Supervisor</Text>
                    {/* FALTA HACER */}
                    {/* MOSTRAR EL NOMBRE DEL SUPERVISOR EN LUGAR DEL ID */}
                    <Text>{multa.idSupervisor || '-'}</Text>
                </Card>
            </ScrollView>
        )
    }
    return (
        <View style={estilos.screen}>
            {componentToRender}
        </View>
    )
}

const estilos = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    details: {
        width: "100%",
    },
    titulo: {
        fontWeight: "bold",
    },
    imageContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    image: {
        marginRight: 16,
        marginBottom: 16,
        width: 100,
        height: 100
    }
});

export default MultaScreen;

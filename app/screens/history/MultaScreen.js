import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, ActivityIndicator, View, Pressable, Image as ReactNativeImage, useWindowDimensions } from "react-native";
import { Card, Icon, Image, Overlay, Text } from "react-native-elements";
import * as firebase from "firebase";
import 'firebase/firestore';
import Modal from "../../components/Modal";
import { get } from "lodash";
import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";

const MultaScreen = props => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [multa, setMulta] = useState(null);
    const [inspector, setInspector] = useState(null);
    const [showImageModal, setShowImageModal] = useState(false);
    const [imageModalUrl, setImageModalUrl] = useState('');
    const window = useWindowDimensions();

    // trae los datos de la multa desde firebase
    useEffect(() => {
        setLoading(true);
        setError(false);
        setMulta(null);
        setInspector(null);
        const { id } = props.route.params;
        firebase.firestore().collection("multas").doc(id).get()
            .then(async doc => {
                setMulta(doc.data());
                if (doc.data().idInspector) {
                    const anotherDoc = await firebase.firestore().collection("usuarios").doc(doc.data().idInspector).get();
                    setInspector(anotherDoc.data());
                }
                setLoading(false);
                setError(false);
            }).catch(error => {
                console.log(error);
                setLoading(false);
                setError(error);
            });
    }, [props.route.params.id]);

    const onImagePress = url => {
        setImageModalUrl(url);
        setShowImageModal(true);
    };

    const onImageClose = () => {
        setShowImageModal(false);
        setImageModalUrl('');
    };

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
                    <Text>{multa.licencia.unicaProvincial ? 'Sí' : 'No'}</Text>
                    <Text style={estilos.titulo}>Clase</Text>
                    <Text>{multa.licencia.clase || '-'}</Text>
                    <Text style={estilos.titulo}>Vencimiento</Text>
                    <Text>{multa.licencia.vencimiento || '-'}</Text>
                    <Text style={estilos.titulo}>Licencia retenida</Text>
                    <Text>{multa.licencia.retenida ? 'Sí' : 'No'}</Text>
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
                    <View style={estilos.inlineImagesContainer}>
                        {multa.fotos.length === 0 && (
                            <Text>No ha adjuntado ninguna fotografía.</Text>
                        )}
                        {multa.fotos.map(foto => (
                            <Pressable key={foto} onPress={() => onImagePress(foto)}>
                                <Image
                                    source={{ uri: foto }}
                                    style={estilos.inlineImage}
                                    PlaceholderContent={<ActivityIndicator />}
                                />
                            </Pressable>
                        ))}
                    </View>
                </Card>
                <Card title="Vencimientos">
                    <Text style={estilos.titulo}>Monto primer vencimiento</Text>
                    <Text>{multa.infraccion.unidadesFijasMin} [UF]</Text>
                    <Text style={estilos.titulo}>Monto segundo vencimiento</Text>
                    <Text>{multa.infraccion.unidadesFijasMax} [UF]</Text>
                </Card>
                <Card title="Estado">
                    <Text style={estilos.titulo}>Estado de la multa</Text>
                    <Text>{multa.estado || '-'}</Text>
                    <Text style={estilos.titulo}>Razón</Text>
                    <Text>{multa.razon || '-'}</Text>
                    <Text style={estilos.titulo}>Supervisor</Text>
                    {/* FALTA HACER */}
                    {/* MOSTRAR EL NOMBRE DEL SUPERVISOR EN LUGAR DEL ID */}
                    <Text>{get(inspector, 'nombre', '')} {get(inspector, 'apellido', '')}</Text>
                </Card>
            </ScrollView>
        );
    }

    return (
        <View style={estilos.screen}>
            {componentToRender}
            <Overlay
                isVisible={showImageModal}
                windowBackgroundColor="rgba(0, 0, 0, 0.9)"
                overlayBackgroundColor="transparent"
                width="100%"
            >
                <Pressable style={estilos.fullScreenImageClose} onPress={onImageClose}>
                    <Icon name="close" color="white" />
                    <Text style={estilos.fullScreenImageCloseText}>Cerrar</Text>
                </Pressable>
                <ReactNativeZoomableView
                    minZoom={1}
                    maxZoom={5}
                    contentWidth={window.width}
                    contentHeight={window.height}
                >
                    <ReactNativeImage style={estilos.fullScreenImage} source={{ uri: imageModalUrl }} />
                </ReactNativeZoomableView>
            </Overlay>
        </View>
    );
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
    inlineImagesContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: -16,
        marginRight: -16
    },
    inlineImage: {
        marginRight: 16,
        marginBottom: 16,
        width: 100,
        height: 100
    },
    fullScreenImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    fullScreenImageClose: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8
    },
    fullScreenImageCloseText: {
        color: 'white',
        marginLeft: 8,
        fontSize: 16
    }
});

export default MultaScreen;

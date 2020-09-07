import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Card, Text } from "react-native-elements";

const MultaScreen = props => {
    return (
        <ScrollView>
            <Card title="Ubicación">
                <Text style={estilos.titulo}>Fecha</Text>
                <Text>2020-01-01</Text>
                <Text style={estilos.titulo}>Hora</Text>
                <Text>2020-01-01</Text>
                <Text style={estilos.titulo}>Lugar de constatación</Text>
                <Text>2020-01-01</Text>
            </Card>
            <Card title="Licencia">

            </Card>
            <Card title="Conductor">

            </Card>
            <Card title="Vehículo">

            </Card>
            <Card title="Infracción">

            </Card>
            <Card title="Pruebas fotográficas">

            </Card>
            <Card title="Vencimientos">

            </Card>
            <Card title="Estado">

            </Card>
        </ScrollView>
    )
}

const estilos = StyleSheet.create({
    titulo: {
        fontWeight: "bold",
    },

})
export default MultaScreen;
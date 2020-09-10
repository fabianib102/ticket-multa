import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, Text, ActivityIndicator, ScrollView, AsyncStorage } from 'react-native';
import * as firebase from "firebase";
import 'firebase/firestore';
import Multa from "../components/Multa";

const History = props => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [multas, setMultas] = useState([]);

    // trae las multas desde firebase
    useEffect(() => {
        setLoading(true);
        setError(false),
        AsyncStorage.getItem("uid")
            .then(uid => {
                // FALTA HACER
                // QUE TRAIGA LAS MULTAS SOLO DEL DIA DE HOY
                firebase.firestore().collection("multas").where("idInspector", "==", uid).get()
                .then(snapshot => {
                    snapshot.forEach(doc => {
                        const multa = {
                            id: doc.id,
                            dni: doc.data().conductor.nroDocumento,
                            nombre: doc.data().conductor.apellido + " " + doc.data().conductor.nombre,
                            extracto: doc.data().infraccion.extracto,
                            foto: doc.data().fotos[0],
                        };
                        setMultas(currentMultas => [...currentMultas, multa]);
                    });
                    setLoading(false);
                }).catch(error => {
                    console.log(error);
                    setLoading(false);
                    setError(error);
                });
            }).catch(error => {
                console.log(error);
            });
    }, []);

    // renderiza una multa
    const renderMulta = ({item}) => {
        return (
            <Multa
                id={item.id}
                dni={item.dni}
                nombre={item.nombre}
                extracto={item.extracto}
                foto={item.foto}
                onPress={() => props.navigation.navigate("multa", {id: item.id})}
            />
        );
    }

    return (
        <ScrollView contentContainerStyle={estilos.screen}>
            {loading ?
                <ActivityIndicator size="large" color="#3494d3" />
            : error ?
                <Text>Ocurrió un error. Intente nuevamente</Text>
            :
                <FlatList
                    keyExtractor={(item, index) => item.id}
                    // data={data}
                    data={multas}
                    renderItem={renderMulta}
                    ListEmptyComponent={<Text>No hay multas realizadas el día de hoy</Text>}
                    style={estilos.list}
                />
            }
        </ScrollView>
    );
}

const estilos = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    list: {
        width: "100%",
        height: "100%",
    }
});

export default History;
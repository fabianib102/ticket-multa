import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Multa from "../components/Multa";

const History = () => {
    const renderMulta = itemData => {
        return (
            <Multa
                id={itemData.item.id}
                dni={itemData.item.dni}
                nombre={itemData.item.nombre}
                extracto={itemData.item.extracto}
            />
        );
    }

    return(
        <View style={estilos.screen}>
            <FlatList
                keyExtractor={(item, index) => item.id}
                data={[{id: "1", dni: "12345678", nombre: "pepe", extracto: "coso"}]}
                renderItem={renderMulta}
                style={estilos.list}
            />
        </View>
    );
}

const estilos = StyleSheet.create({
    screen: {
        flex: 1,
    },
    list: {
        paddingHorizontal: 5,
    }
});

export default History;
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const Multa = props => {
    return(
        <View style={estilos.multa}>
            <Text>{props.id}</Text>
            <Text>{props.dni}</Text>
            <Text>{props.nombre}</Text>
            <Text>{props.extracto}</Text>
        </View>
    );
}

const estilos = StyleSheet.create({
    multa: {
        flex: 1,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: "black",
    }
})

export default Multa;
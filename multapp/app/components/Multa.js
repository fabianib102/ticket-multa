import React from 'react';
import { Text, View, StyleSheet, TouchableNativeFeedback } from 'react-native';

const Multa = props => {
    return (
        <View style={estilos.multa}>
            <TouchableNativeFeedback onPress={props.onPress}>
                <View style={estilos.textContainer}>
                    <Text>{props.id}</Text>
                    <Text>{props.dni}</Text>
                    <Text>{props.nombre}</Text>
                    <Text>{props.extracto}</Text>
                </View>
            </TouchableNativeFeedback>
        </View>
    );
}

const estilos = StyleSheet.create({
    multa: {
        flex: 1,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: "black",
    },
    textContainer: {
        padding: 5,
    }
})

export default Multa;
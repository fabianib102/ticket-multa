import React from 'react';
import {StyleSheet, View, ScrollView, Text, Image} from 'react-native';
import {Button} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';

export default function UserGuest (){

    const navigation = useNavigation();

    return(
        <ScrollView centerContent={true} style={styles.viewBody}>
            <Image
                source={require("../../../assets/img/original.jpg")}
                resizeMode="contain"
                style={styles.image}
            />
            <Text style={styles.title}>Para usar la aplicación debes autenticarte</Text>
            <View style={styles.view}>
                <Button
                    title="Ingresa"
                    buttonStyle={styles.btnStyle}
                    containerStyle={styles.btnContainer}
                    onPress={()=>navigation.navigate("login")}
                />
            </View>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    viewBody: {
        marginLeft: 30,
        marginRight: 30,
    },
    image:{
        height: 300,
        width: "100%",
        marginBottom: 40,
    },
    view:{
        flex: 1,
        alignItems: "center"
    },
    title:{
        fontWeight: "bold",
        fontSize: 19,
        marginBottom: 10,
        textAlign: "center"
    },
    btnStyle:{
        backgroundColor:"#3494d3" 
    },
    btnContainer:{
        width: "70%"
    },

});
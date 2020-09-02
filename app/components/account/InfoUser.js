import React, {useState} from "react";
import {StyleSheet, Text, View} from 'react-native';
import {Avatar} from "react-native-elements";

export default function InfoUser(props){

    const {userInfo} = props;

    return(
        <View style={styles.viewUserInfo}>
            <Avatar 
                rounded
                size="large"
                containerStyle={styles.userInfoAvatar}
            />
            <View>
                <Text style={styles.displayName}>Fabi Ibañez</Text>
                <Text>fabianib102@gmail.com</Text>
            </View>
        </View>
    );

}


const styles = StyleSheet.create({
    viewUserInfo:{
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "#f2f2f2",
        paddingTop: 30,
        paddingBottom: 30
    },
    userInfoAvatar:{
        marginRight: 20
    },
    displayName:{
        fontWeight: "bold",
        paddingBottom: 5
    }
})
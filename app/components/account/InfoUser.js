import React from "react";
import {StyleSheet, Text, View} from 'react-native';
import {Avatar} from "react-native-elements";

export default function InfoUser(props){

    const {
        userInfo: {photoURL, displayName, email},
    } = props;
    //console.log(userInfo);

    return(
        <View style={styles.viewUserInfo}>
            <Avatar 
                rounded
                size="large"
                containerStyle={styles.userInfoAvatar}
                source={
                    photoURL ? 
                    {uri: photoURL}:
                    require("../../../assets/img/avatar-default.jpg")
                }
            />
            <View>
                <Text style={styles.displayName}>{displayName ? displayName : "Sin nombre"}</Text>
                <Text>{email}</Text>
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
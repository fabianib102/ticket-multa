import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Icon} from 'react-native-elements';
import {firebaseApp} from "../../utils/firebase";
import firebase from "firebase/app";

export default function NewMulta (props){
    const { navigation } = props;
    const [user, setUser] = useState(null);
    
    useEffect(()=>{
        firebase.auth().onAuthStateChanged((userInfo)=>{
            setUser (userInfo)
        })
    }, [])

    return(
        <View style={styles.viewBody}>
            <Text>Es donde se hace una nueva multa, desde el screens</Text>

            {user && 
             <Icon
                reverse
                type="material-community"
                name="plus"
                color="#3494d3"
                containerStyle={styles.btnContainer}
                onPress={()=>navigation.navigate("add-multa")}
            />}
        </View>
    );
}


const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        backgroundColor: "#fff",
    },
    btnContainer:{
        position: "absolute",
        bottom: 10,
        right: 10,
        shadowColor: "black",
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.5
    }

});
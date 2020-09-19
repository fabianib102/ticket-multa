import React, {useRef, useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from "react-native-elements";
import Toast from "react-native-easy-toast";
import * as firebase from "firebase";
import Loading from "../../components/Loading";
import InfoUser from "../../components/account/InfoUser";
import AccountOption from "../../components/account/AccountOption";

export default function UserLogged(){

    const toastRef = useRef();
    const [userInfo, setUserInfo] = useState(null);
    // const [loading, setLoading] = useState(false);
    // const [loadingText, setLoadingText] = useState("");

    useEffect(()=>{
        (async ()=>{
            const user = await firebase.auth().currentUser;
            setUserInfo(user);
        })()

    }, [])

    return(
        <View style={styles.viewUserInfo}>
            {userInfo && <InfoUser userInfo={userInfo}/>}

            <AccountOption userInfo={userInfo} toastRef={toastRef} />

            <Button 
                title="Cerrar Sesión"
                buttonStyle={styles.closeSession}
                titleStyle={styles.closeSessionTxt} 
                onPress={()=>firebase.auth().signOut()}
            />
            {/* <Toast ref={toastRef} position="center" opacity={0.9}/>
            <Loading text={loadingText} isVisible={loading} /> */}
        </View>
    );
}

const styles = StyleSheet.create({
    viewUserInfo:{
        minHeight: "100%",
        backgroundColor: "#f2f2f2"
    },
    closeSession:{
        marginTop: 30,
        borderRadius: 0,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#e3e3e3",
        borderBottomWidth: 1,
        borderBottomColor: "#e3e3e3",
        paddingTop: 10,
        paddingBottom: 10
    },
    closeSessionTxt:{
        color: "#3494d3"
    }
})
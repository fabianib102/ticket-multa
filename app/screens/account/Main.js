import React, {useState, useEffect} from 'react';
import {firebaseApp} from '../../utils/firebase';
import Loading from '../../components/Loading';
import * as firebase from "firebase";
import UserGuest from './UserGuest';
import UserLogged from './UserLogged';

export default function Main (){

    const [login, setLogin] = useState(null);

    useEffect(()=>{
        firebase.auth().onAuthStateChanged((user)=>{
            !user ? setLogin(false): setLogin(true)
        })
    })

    if(login === null) return <Loading isVisible={true} text={"Cargando..."}/>

    return login ? <UserLogged/>:<UserGuest/>;
}
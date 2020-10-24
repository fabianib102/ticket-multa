import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import {firebaseApp} from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";
import MultasList from "../../components/multa/MultasList";

const db = firebase.firestore(firebaseApp);

export default function ListMulta(props) {
  const { navigation } = props;
  const [user, setUser] = useState(null);
  const [multas, setMultas] = useState(null);
  const [totalMultas, setTotalmultas] = useState(0);
  const [startMultas, setStartMultas] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      setUser(userInfo);
    });
  }, []);

  useEffect(() => {
    db.collection("multas").get().then((snap)=>{
        setTotalmultas(snap.size)
    });

    const arrayMulta = [];

    db.collection("multas")
    .limit(10)
    .get().then((resp) => {
      setStartMultas(resp.docs[resp.docs.length - 1]);
      resp.forEach((doc) => {
        const multa = doc.data();
        multa.id = doc.id;
        arrayMulta.push(multa);
      })
      setMultas(arrayMulta)
    })

  }, []);

  return (
    <View>
      {user ? (
        // <Text>Deberiamos poder ver las multas {totalMultas}</Text>
        <MultasList multas={multas}/>
      ) : (
        <Text>No estas logueado para ver las multas</Text>
      )}
    </View>
  );
}




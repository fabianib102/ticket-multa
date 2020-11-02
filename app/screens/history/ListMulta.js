import React, { useEffect, useState } from "react";
import {StyleSheet, Text, View } from "react-native";
import { firebaseApp } from "../../utils/firebase";
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
  const [idInspector, setId] = useState(null);
  const actualDate = getActualDate();
  const arrayMulta = [];

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      setUser(userInfo);
      setId(userInfo.uid);
    });
  }, []);

  useEffect(() => {

    db.collection("multas")
      .where("idInspector", "==", idInspector)
      .limit(10)
      .get()
      .then((resp) => {
        setTotalmultas(resp.docs.length);

        setStartMultas(resp.docs[resp.docs.length - 1]);
        resp.forEach((doc) => {
          const multa = doc.data();
          // multa.id = doc.id;
          // arrayMulta.push(multa);
          //console.log("la multa: .----------------", multa.ubicacion.fecha);
          if (multa.ubicacion.fecha == actualDate) {
            multa.id = doc.id;
            arrayMulta.push(multa);
          }
        });
        setMultas(arrayMulta);
      });
  }, []);

  return (
    <View>
      {user ? (
        totalMultas > 0 ? (
          <MultasList multas={multas} />
        ) : (
          <Text style={styles.textTicket}>No tienes multas realizadas en el día</Text>
        )
      ) : (
        <Text style={styles.textTicket}>No estas logueado para ver las multas</Text>
      )}
    </View>
  );

  function getActualDate() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    return dd + "/" + mm + "/" + yyyy;
  }
}

const styles = StyleSheet.create({
  textTicket: {
    top: 20,
    textAlign: "center" 
  }
});

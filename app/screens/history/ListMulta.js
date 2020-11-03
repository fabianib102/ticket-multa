import React, { useEffect, useState } from "react";
import {StyleSheet, Text, View, FlatList } from "react-native";
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
          // <MultasList multas={multas} />
          <FlatList
            data={multas}
            renderItem={(multa) => <Multa multa={multa} />}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <Text style={styles.textTicket}>No tienes multas realizadas en el día</Text>
        )
      ) : (
        <Text style={styles.textTicket}>No estas logueado para ver las multas</Text>
      )}
    </View>
  );

}

function Multa(props) {
  const { multa } = props;
  const { conductor, vehiculo, estado } = multa.item;

  return (
    <View style={styles.viewMulta}>
      <View style={styles.itemMulta}>
        <Text style={styles.surName}> Infractor: {conductor.apellido}, {conductor.nombre}</Text>
        <Text style={styles.vehicle}>Vehiculo: {vehiculo.marca}, {vehiculo.modelo}</Text>
        <Text style={styles.state}>Estado: {estado}</Text>
      </View>
    </View>
  );
}

function getActualDate() {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  let yyyy = today.getFullYear();
  return dd + "/" + mm + "/" + yyyy;
}

const styles = StyleSheet.create({
  textTicket: {
    top: 20,
    textAlign: "center" 
  },
  textWarning: {
    marginTop: 10,
    marginLeft: 10,
    alignItems: "center",
  },
  viewMulta: {
    flexDirection: "row",
    // margin: 10,
    marginTop: 5,
    padding: 10,
    backgroundColor: "#3b9fe078",
  },
  itemMulta:{
    width: "100%"
  },
  surName: {
    fontWeight: "bold",
  },
  vehicle: {
    paddingTop: 2,
    color: "black",
    marginLeft: 10,
  },
  state:{
    fontWeight: "bold",
    color: "black",
    marginLeft: 10,
    alignSelf: 'flex-end'
  }
});

import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, Text, ActivityIndicator, ScrollView, View } from 'react-native';
import * as firebase from "firebase";
import 'firebase/firestore';
import Multa from '../../components/Multa';
import { useNavigation } from '@react-navigation/native';
import { Button, Icon } from 'react-native-elements';

const History = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [multas, setMultas] = useState([]);

  const onRefresh = uid => {
    setLoading(true);
    setError(false);
    setMultas([]);

    firebase.firestore().collection("multas").where("idInspector", "==", uid || user.uid).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          const multa = {
            id: doc.id,
            dni: doc.data().conductor.nroDocumento,
            nombre: doc.data().conductor.apellido + " " + doc.data().conductor.nombre,
            extracto: doc.data().infraccion.extracto,
            foto: doc.data().fotos[0],
          };
          setMultas(currentMultas => [...currentMultas, multa]);
        });
        setLoading(false);
      }).catch(error => {
        console.log(error);
        setLoading(false);
        setError(error);
      });
  };

  // trae las multas desde firebase
  useEffect(() => {
    setLoading(true);
    setError(false);
    setMultas([]);
    firebase.auth().onAuthStateChanged(userInfo => {
      setUser(userInfo);
      onRefresh(userInfo.uid);
    });
  }, []);

  // renderiza una multa
  const renderMulta = ({ item }) => (
    <Multa
      id={item.id}
      dni={item.dni}
      nombre={item.nombre}
      extracto={item.extracto}
      foto={item.foto}
      onPress={() => navigation.navigate("multa", {id: item.id})}
    />
  );

  return (
    <View style={{ height: '100%' }}>
      <ScrollView contentContainerStyle={styles.screen}>
        {!user ? (
          <Text>Debe iniciar sesión para ver las multas</Text>
        ) :loading ?
          <ActivityIndicator size="large" color="#3494d3" />
        : error ?
          <Text>Ocurrió un error. Intente nuevamente</Text>
        :
          <FlatList
            keyExtractor={item => item.id}
            data={multas}
            renderItem={renderMulta}
            ListEmptyComponent={<Text>No hay multas realizadas el día de hoy</Text>}
            style={styles.list}
          />
        }
      </ScrollView>
      <Button
        title="Refrescar"
        icon={<Icon name="refresh" color={loading ? 'black' : 'white'} />}
        disabled={loading}
        onPress={() => onRefresh()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    width: "100%",
    height: "100%",
  }
});

export default History;

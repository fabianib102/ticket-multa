import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Image } from "react-native-elements";
import { size } from "lodash";

export default function MultasList(props) {
  const { multas } = props;
  const [user, setUser] = useState(null);

  return (
    <View>
      {size(multas) > 0 ? (
        <FlatList
          data={multas}
          renderItem={(multa) => <Multa multa={multa} />}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <View style={styles.textWarning}>
          <ActivityIndicator size="large" color="#3494d3" />
          <Text>Cargando Multas</Text>
        </View>
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

const styles = StyleSheet.create({
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

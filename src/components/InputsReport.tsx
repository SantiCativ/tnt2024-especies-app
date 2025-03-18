import { useState } from "react";
import { Pressable, View, StyleSheet, TextInput } from "react-native";
import { TextNunitoSans } from "@/src/components/TextNunitoSans";

export const InputsReport = () => {
  const [descripcion, setDescripcion] = useState("");
  const [latitud, setLatitud] = useState("");
  const [longitud, setLongitud] = useState("");
  const [fecha, setFecha] = useState<Date>(new Date());
  const [hora, setHora] = useState<Date>(new Date());
  return (
    <View style={styles.Container}>
      <View style={styles.row}>
        <TextInput
          placeholder="Latitud"
          onChangeText={setLatitud}
          value={latitud}
          style={styles.inputs}
        />
        <TextInput
          placeholder="Longitud"
          onChangeText={setLongitud}
          value={longitud}
          style={styles.inputs}
        />
      </View>
      <View style={styles.row}>
        <TextInput
          placeholder="Fecha"
          onChangeText={setFecha}
          value={fecha}
          style={styles.inputs}
        />
        <TextInput
          placeholder="Hora"
          onChangeText={setHora}
          value={hora}
          style={styles.inputs}
        />
      </View>

      <TextInput
        placeholder="Descripción"
        onChangeText={setDescripcion}
        value={descripcion}
        multiline={true}
        numberOfLines={4}
        style={styles.textArea}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    width: "100%",
  },
  inputs: {
    height: 50,
    width: '48%', // Adjusted to fit two inputs in a row
    backgroundColor: "white",
    color: "#787878",
    borderRadius: 30,
    paddingLeft: 10,
    paddingRight: 3,
  },
  textArea: { 
    height: 88,
    width: "100%",
    backgroundColor: "white",
    borderRadius: 30,
    paddingLeft: 14,
    paddingTop: 10, // Añadir padding superior e inferior para el texto
    textAlignVertical: "top", // Alinea el texto en la parte superior del textarea
  },
});

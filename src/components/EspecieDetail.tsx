import { TEspecie } from "../services/especies.service";
import { View, StyleSheet,Dimensions } from "react-native";
import { TextNunitoSans } from "@/src/components/TextNunitoSans";
import { Boton } from "./BotonReportar";

export const Encabezado = () => {
  return (
    <View style={styles.td}>
      <TextNunitoSans style={{ color: "#BEDE61", fontSize: 12 }}>
        ID
      </TextNunitoSans>
      <TextNunitoSans style={{ color: "#BEDE61", fontSize: 12 }}>
        Reino
      </TextNunitoSans>
      <TextNunitoSans style={{ color: "#BEDE61", fontSize: 12 }}>
        Phy/Div
      </TextNunitoSans>
      <TextNunitoSans style={{ color: "#BEDE61", fontSize: 12 }}>
        Clase
      </TextNunitoSans>
      <TextNunitoSans style={{ color: "#BEDE61", fontSize: 12 }}>
        Orden
      </TextNunitoSans>
      <TextNunitoSans style={{ color: "#BEDE61", fontSize: 12 }}>
        Familia
      </TextNunitoSans>
      <TextNunitoSans style={{ color: "#BEDE61", fontSize: 12 }}>
        Origen
      </TextNunitoSans>
    </View>
  );
};

export const Detalle: React.FC<{ especie: TEspecie }> = ({ especie }) => {
  const phydivValue = especie.phydiv || "-"; // Valor predeterminado

  return (
    <View style={styles.tr}>
      <TextNunitoSans style={{ color: "white", fontSize: 12 }}>
        {especie.sp_id}
      </TextNunitoSans>
      <TextNunitoSans style={{ color: "white", fontSize: 12 }}>
        {especie.reino}
      </TextNunitoSans>
      <TextNunitoSans style={{ color: "white", fontSize: 12 }}>
        {phydivValue}
      </TextNunitoSans>
      <TextNunitoSans style={{ color: "white", fontSize: 12 }}>
        {especie.clase}
      </TextNunitoSans>
      <TextNunitoSans style={{ color: "white", fontSize: 12 }}>
        {especie.orden}
      </TextNunitoSans>
      <TextNunitoSans style={{ color: "white", fontSize: 12 }}>
        {especie.familia}
      </TextNunitoSans>
      <TextNunitoSans style={{ color: "white", fontSize: 12 }}>
        {especie.origen}
      </TextNunitoSans>
    </View>
  );
};

export const EspecieDetail: React.FC<{ especie: TEspecie }> = ({ especie }) => {
  return (
    <View style={styles.ContainerDetail}>
      <View style={styles.ContainerTable}>
        <Encabezado></Encabezado>
        <Detalle especie={especie}></Detalle>
      </View>
      <Boton></Boton>
    </View>
  );
};

const styles = StyleSheet.create({
  ContainerDetail: {
    height: Dimensions.get('window').height/2,
    top:-20,
    backgroundColor: "black",
    margin:15,
    borderRadius:20
  },
  ContainerTable: {
    flexDirection: "row",
    gap: 15,
    padding:50
  },
  td: { gap: 15 },
  tr: {gap:15},
});

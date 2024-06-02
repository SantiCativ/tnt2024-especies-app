import { TEspecie } from "../services/especies.service";
import { Pressable, View, StyleSheet } from "react-native";
import { TextNunitoSans } from "@/src/components/TextNunitoSans";
import { Link } from "expo-router";

export const Boton = () => {
  return (
    <Link
      href={{
        pathname: "/report",
      }}
      asChild
    >
      <Pressable style={styles.ContainerBoton}>
        <View style={styles.botton}>
          <TextNunitoSans>Reportar Avistaje</TextNunitoSans>
        </View>
      </Pressable>
    </Link>
  );
};
export const Encabezado = () => {
  return (
    <View style={styles.td}>
      <TextNunitoSans style={{ color: "#BEDE61", fontSize: 12 }}>
        Id
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
  ContainerDetail: {},
  ContainerTable: {
    flexDirection: "row",
    gap: 5,
    margin: 30,
    backgroundColor: "#13140D",
  },
  td: {},
  tr: {},
  ContainerBoton: {
    alignItems: "center",
    justifyContent: "center",
  },
  botton: {
    width: 173,
    height: 46,
    borderRadius: 30,
    backgroundColor: "#BEDE61",
    alignItems: "center",
    justifyContent: "center",
  },
});

import { TEspecie } from "../services/especies.service";
import { View, StyleSheet, Dimensions } from "react-native";
import { TextNunitoSans } from "@/src/components/TextNunitoSans";
import { BotonReportar } from "./BotonReportar";

export const Encabezado = () => {
  return (
    <View style={styles.td}>
      <TextNunitoSans style={styles.textoEncabezado}>ID</TextNunitoSans>
      <TextNunitoSans style={styles.textoEncabezado}>Reino</TextNunitoSans>
      <TextNunitoSans style={styles.textoEncabezado}>Phy/Div</TextNunitoSans>
      <TextNunitoSans style={styles.textoEncabezado}>Clase</TextNunitoSans>
      <TextNunitoSans style={styles.textoEncabezado}>Orden</TextNunitoSans>
      <TextNunitoSans style={styles.textoEncabezado}>Familia</TextNunitoSans>
      <TextNunitoSans style={styles.textoEncabezado}>Origen</TextNunitoSans>
    </View>
  );
};

export const Detalle: React.FC<{ especie: TEspecie }> = ({ especie }) => {
  const phydivValue = especie.phydiv || "-"; // Valor predeterminado

  return (
    <View style={styles.tr}>
      <TextNunitoSans style={styles.textoDetalle}>
        {especie.sp_id}
      </TextNunitoSans>
      <TextNunitoSans style={styles.textoDetalle}>
        {especie.reino}
      </TextNunitoSans>
      <TextNunitoSans style={styles.textoDetalle}>
        {phydivValue}
      </TextNunitoSans>
      <TextNunitoSans style={styles.textoDetalle}>
        {especie.clase}
      </TextNunitoSans>
      <TextNunitoSans style={styles.textoDetalle}>
        {especie.orden}
      </TextNunitoSans>
      <TextNunitoSans style={styles.textoDetalle}>
        {especie.familia}
      </TextNunitoSans>
      <TextNunitoSans style={styles.textoDetalle}>
        {especie.origen}
      </TextNunitoSans>
    </View>
  );
};

export const EspecieDetail: React.FC<{ especie: TEspecie }> = ({ especie }) => {
  return (
    <View style={styles.ContainerDetail}>
      <View style={styles.ContainerTable}>
        <Encabezado/>
        <Detalle especie={especie}/>
      </View>
      <BotonReportar/>
    </View>
  );
};

const styles = StyleSheet.create({
  ContainerDetail: {
    height: Dimensions.get("window").height / 2,
    top: -20,
    backgroundColor: "black",
    margin: 15,
    borderRadius: 20,
  },
  ContainerTable: {
    flexDirection: "row",
    gap: 15,
    padding: 50,
  },
  td: { gap: 15 },
  tr: { gap: 15 },
  textoEncabezado: {
    color: "#BEDE61",
    fontSize: 12,
  },
  textoDetalle: {
    color: "white",
    fontSize: 12,
  },
});

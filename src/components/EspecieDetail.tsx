import { View, StyleSheet } from "react-native";
import { TextNunitoSans } from "@/src/components/TextNunitoSans";
import { TEspecie } from "@/src/services/especies.service";
import { FC, Fragment } from "react";
import { themeColors } from "../theme/theme";
import { CustomButton } from "./CustomButton";
import { Link } from "expo-router";

type EspecieDetailProps = {
  especie: TEspecie;
};
export const EspecieDetail: FC<EspecieDetailProps> = ({ especie }) => {
  return (
    <Fragment>
      <View style={styles.containerTop} />
      <View style={{ flex: 1, justifyContent: "space-around" }}>
        <View style={styles.detailContainer}>
          <View style={styles.labelsContainer}>
            <TextNunitoSans style={styles.label}>ID</TextNunitoSans>
            <TextNunitoSans style={styles.label}>Reino</TextNunitoSans>
            <TextNunitoSans style={styles.label}>Phy/Div</TextNunitoSans>
            <TextNunitoSans style={styles.label}>Clase</TextNunitoSans>
            <TextNunitoSans style={styles.label}>Orden</TextNunitoSans>
            <TextNunitoSans style={styles.label}>Familia</TextNunitoSans>
            <TextNunitoSans style={styles.label}>Origen</TextNunitoSans>
          </View>
          <View style={styles.valuesContainer}>
            <TextNunitoSans>{especie.sp_id}</TextNunitoSans>
            <TextNunitoSans>{especie.reino}</TextNunitoSans>
            <TextNunitoSans>{especie.phydiv ?? "-"}</TextNunitoSans>
            <TextNunitoSans>{especie.clase}</TextNunitoSans>
            <TextNunitoSans>{especie.orden}</TextNunitoSans>
            <TextNunitoSans>{especie.familia}</TextNunitoSans>
            <TextNunitoSans>{especie.origen}</TextNunitoSans>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Link
            href={{
              pathname: "/(tabs)/report",
              params: { reportSpId: especie.sp_id },
            }}
          >
            <CustomButton label="Reportar avistaje" />
          </Link>
        </View>
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  label: { textAlign: "right", color: themeColors.primary },
  containerTop: {
    width: "100%",
    height: 30,
    backgroundColor: themeColors.screenBackground,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    marginTop: -30,
  },
  detailContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 20,
    alignItems: "flex-start",
  },
  labelsContainer: { justifyContent: "flex-end", gap: 10 },
  valuesContainer: { gap: 10 },
  buttonContainer: { paddingHorizontal: 20, alignItems: "center" },
});

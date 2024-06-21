import { Dispatch, FC, SetStateAction } from "react";
import { useEspecies } from "../services/especies.hooks";
import ModalSelector from "react-native-modal-selector";
import { Platform, StyleSheet, TextInput } from "react-native";

type EspecieSelectorProps = {
  spId: string | null;
  setSpId: Dispatch<SetStateAction<string | null>>;
};

export const EspecieSelector: FC<EspecieSelectorProps> = ({
  spId,
  setSpId,
}) => {
  const { data } = useEspecies();

  const especieSeleccionada = data.find(
    (especie) => especie.sp_id === parseInt(spId ?? "-1")
  );

  const transformedData = data.map((especie) => {
    return { key: especie.sp_id, label: especie.nombre_cientifico };
  });

  return (
    <ModalSelector
      data={transformedData}
      initValue={spId ?? ""}
      onChange={(option) => {
        setSpId(option.key.toString());
      }}
      animationType="fade"
      optionContainerStyle={styles.optionContainerStyle}
      optionStyle={styles.optionStyle}
      optionTextStyle={styles.optionTextStyle}
    >
      <TextInput
        placeholder="Especie"
        value={especieSeleccionada?.nombre_cientifico ?? ""}
        style={styles.inputStyle}
      />
    </ModalSelector>
  );
};

const styles = StyleSheet.create({
  optionContainerStyle: { backgroundColor: "white" },
  optionStyle: { backgroundColor: "white" },
  optionTextStyle: {
    color: Platform.select({
      ios: "rgba(0,118,255,0.9)",
      default: "black",
    }),
  },
  inputStyle: {
    height: 50,
    width: 300,
    backgroundColor: "white",
    borderRadius: 30,
    paddingLeft: 20,
    paddingRight: 3,
  },
});

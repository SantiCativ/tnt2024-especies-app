import { Dispatch, FC, SetStateAction } from "react";
import { useEspeciesHome } from "../services/especies.hooks";
import ModalSelector from "react-native-modal-selector";
import { Platform, StyleProp, StyleSheet, TextStyle } from "react-native";
import { CustomTextInput } from "./CustomTextInput";

type EspecieSelectorProps = {
  spId: string | null;
  setSpId: Dispatch<SetStateAction<string | null>>;
  inputStyle?: StyleProp<TextStyle>;
};

export const EspecieSelector: FC<EspecieSelectorProps> = ({
  spId,
  setSpId,
  inputStyle,
}) => {
  const { data } = useEspeciesHome();

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
      <CustomTextInput
        placeholder="Seleccione una especie"
        value={especieSeleccionada?.nombre_cientifico ?? ""}
        style={inputStyle}
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
});

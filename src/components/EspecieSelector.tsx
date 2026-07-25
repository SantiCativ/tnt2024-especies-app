import { Dispatch, FC, SetStateAction } from "react";
import { useEspeciesHome } from "../services/especies.hooks";
import ModalSelector from "react-native-modal-selector";
import { ActivityIndicator, Platform, StyleProp, StyleSheet, TextStyle, View } from "react-native";
import { CustomTextInput } from "./CustomTextInput";
import { themeColors } from "../theme/theme";

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
  const { data, isFetching, isLoading } = useEspeciesHome();

  const isDataLoading = isLoading || isFetching;

  const especieSeleccionada = (data ?? []).find(
    (especie) => especie.sp_id === parseInt(spId ?? "-1")
  );

  const transformedData = (data ?? []).map((especie) => {
    return { key: especie.sp_id, label: especie.nombre_cientifico };
  });

  return (
    <ModalSelector
      data={transformedData}
      initValue={spId ?? ""}
      onChange={(option) => {
        setSpId(option.key.toString());
      }}
      disabled={isDataLoading && transformedData.length === 0}
      animationType="fade"
      optionContainerStyle={styles.optionContainerStyle}
      optionStyle={styles.optionStyle}
      optionTextStyle={styles.optionTextStyle}
    >
      <View style={styles.inputContainer}>
        <CustomTextInput
          placeholder={
            isDataLoading && transformedData.length === 0
              ? "Cargando especies..."
              : "Seleccione una especie"
          }
          value={especieSeleccionada?.nombre_cientifico ?? ""}
          style={[inputStyle, isDataLoading && styles.paddingRightLoading]}
          editable={false}
          pointerEvents="none"
        />
        {isDataLoading && (
          <ActivityIndicator
            size="small"
            color={themeColors.primary}
            style={styles.loadingIndicator}
          />
        )}
      </View>
    </ModalSelector>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    position: "relative",
    justifyContent: "center",
  },
  paddingRightLoading: {
    paddingRight: 40,
  },
  loadingIndicator: {
    position: "absolute",
    right: 15,
  },
  optionContainerStyle: { backgroundColor: "white" },
  optionStyle: { backgroundColor: "white" },
  optionTextStyle: {
    color: Platform.select({
      ios: "rgba(0,118,255,0.9)",
      default: "black",
    }),
  },
});


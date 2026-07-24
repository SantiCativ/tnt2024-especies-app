import { FC } from "react";
import { ActivityIndicator, StyleSheet, View, ViewStyle } from "react-native";
import { TextNunitoSans } from "./TextNunitoSans";
import { themeColors } from "../theme/theme";

type CustomButtonProps = {
  label: string;
  isLoading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
};

export const CustomButton: FC<CustomButtonProps> = ({
  label,
  isLoading = false,
  disabled = false,
  style,
}) => {
  return (
    <View style={[styles.button, disabled && styles.disabled, style]}>
      {isLoading ? (
        <ActivityIndicator color="black" size="small" />
      ) : (
        <TextNunitoSans style={styles.buttonText}>{label}</TextNunitoSans>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: themeColors.primary,
    height: 46,
    paddingHorizontal: 50,
    borderRadius: 30,
  },
  disabled: {
    opacity: 0.6,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});


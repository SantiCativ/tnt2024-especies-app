import { FC } from "react";
import { View, StyleSheet } from "react-native";
import { TextNunitoSans } from "./TextNunitoSans";
import { themeColors } from "../theme/theme";

type CustomButtonProps = { label: string };
export const CustomButton: FC<CustomButtonProps> = ({ label }) => {
  return (
    <View style={styles.button}>
      <TextNunitoSans style={styles.buttonText}>{label}</TextNunitoSans>
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
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

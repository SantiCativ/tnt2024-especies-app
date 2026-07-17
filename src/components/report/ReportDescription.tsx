import { FC } from "react";
import { StyleProp, StyleSheet, TextStyle } from "react-native";
import { CustomTextInput } from "@/src/components/CustomTextInput";

type ReportDescriptionProps = {
  inputStyle?: StyleProp<TextStyle>;
  onChangeText: (value: string) => void;
  value: string;
};

export const ReportDescription: FC<ReportDescriptionProps> = ({
  inputStyle,
  onChangeText,
  value,
}) => {
  return (
    <CustomTextInput
      placeholder="Descripción"
      onChangeText={onChangeText}
      value={value}
      returnKeyType="done"
      multiline
      numberOfLines={3}
      style={[styles.descripcionInput, inputStyle]}
    />
  );
};

const styles = StyleSheet.create({
  descripcionInput: {
    height: 88,
    paddingLeft: 30,
  },
});

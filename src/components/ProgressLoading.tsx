import { ActivityIndicator, StyleSheet, TextStyle, View, ViewStyle } from "react-native";
import { TextNunitoSans } from "@/src/components/TextNunitoSans";
import { themeColors } from "@/src/theme/theme";
import React from "react";

export interface ProgressLoadingProps {
  text?: string;
  size?: "small" | "large" | number;
  color?: string;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function ProgressLoading({
  text = "Cargando...",
  size = "large",
  color = themeColors.primary,
  icon,
  style,
  textStyle,
}: ProgressLoadingProps) {
  return (
    <View style={[styles.container, style]}>
      {icon ?? <ActivityIndicator size={size} color={color} />}
      {Boolean(text) && (
        <TextNunitoSans style={[styles.text, textStyle]}>
          {text}
        </TextNunitoSans>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    padding: 20,
  },
  text: {
    color: themeColors.textBase,
    fontSize: 16,
    textAlign: "center",
  },
});

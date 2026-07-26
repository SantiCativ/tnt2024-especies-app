import { FC } from "react";
import { View, StyleSheet } from "react-native";
import { TextNunitoSans } from "@/src/components/TextNunitoSans";

export const AuthDivider: FC = () => (
  <View style={styles.dividerContainer}>
    <View style={styles.dividerLine} />

    <TextNunitoSans style={styles.dividerText}>
      o
    </TextNunitoSans>

    <View style={styles.dividerLine} />
  </View>
);

const styles = StyleSheet.create({
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },

  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255,255,255,0.12)",
  },

  dividerText: {
    color: "rgba(255,255,255,0.4)",
    fontSize: 14,
    marginHorizontal: 16,
    fontWeight: "400",
  },
});

import { FC } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { TextNunitoSans } from "@/src/components/TextNunitoSans";

export const AuthTerms: FC = () => (
  <View style={styles.termsContainer}>
    <TextNunitoSans style={styles.termsText}>
      Al continuar, aceptás nuestros
    </TextNunitoSans>

    <View style={styles.termsLinks}>
      <TouchableOpacity>
        <TextNunitoSans style={styles.termsLink}>
          Términos de uso
        </TextNunitoSans>
      </TouchableOpacity>

      <TextNunitoSans style={styles.termsText}>
        {" "}y{" "}
      </TextNunitoSans>

      <TouchableOpacity>
        <TextNunitoSans style={styles.termsLink}>
          Política de privacidad
        </TextNunitoSans>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  termsContainer: {
    alignItems: "center",
    marginTop: 24,
  },

  termsText: {
    fontSize: 12,
    color: "rgba(255,255,255,0.5)",
    fontWeight: "400",
  },

  termsLinks: {
    flexDirection: "row",
    marginTop: 2,
  },

  termsLink: {
    fontSize: 12,
    color: "rgba(255,255,255,0.7)",
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});

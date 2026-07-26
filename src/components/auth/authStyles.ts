import { StyleSheet } from "react-native";
import { themeColors } from "@/src/theme/theme";

export const authStyles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#1C1D15",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    marginTop: -24,
    paddingHorizontal: 28,
    paddingTop: 32,
    paddingBottom: 30,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  headerIcon: {
    marginRight: 10,
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "white",
  },

  subtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.6)",
    lineHeight: 20,
    marginBottom: 24,
    fontWeight: "400",
  },

  submitButton: {
    backgroundColor: themeColors.primary,
    height: 52,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
  },

  submitButtonDisabled: {
    opacity: 0.7,
  },

  submitButtonText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#13140D",
  },

  secondaryButton: {
    flexDirection: "row",
    height: 52,
    borderRadius: 26,
    borderWidth: 1.5,
    borderColor: themeColors.primary,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },

  secondaryButtonIcon: {
    marginRight: 8,
  },

  secondaryButtonText: {
    fontSize: 17,
    fontWeight: "700",
    color: themeColors.primary,
  },
});

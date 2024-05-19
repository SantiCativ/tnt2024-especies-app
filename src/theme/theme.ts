import { StyleSheet } from "react-native";

export const themeColors = {
  screenBackground: "#13140D",
  textBase: "white",
  primary: "#BEDE61",
  heart: "#EF5DA8",
};

export const themeStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: themeColors.screenBackground,
  },
  textBase: {
    color: themeColors.textBase,
  },
});

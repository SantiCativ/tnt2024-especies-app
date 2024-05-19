import { TextProps, Text as RNText } from "react-native";
import { themeStyles } from "@/src/theme/theme";
import { useFonts } from "expo-font";

const regularMap = {
  100: "NunitoSans_10pt_ExtraLight",
  200: "NunitoSans_10pt_ExtraLight",
  300: "NunitoSans_10pt_Light",
  normal: "NunitoSans_10pt_Regular",
  400: "NunitoSans_10pt_Regular",
  500: "NunitoSans_10pt_Medium",
  600: "NunitoSans_10pt_SemiBold",
  bold: "NunitoSans_10pt_Bold",
  700: "NunitoSans_10pt_Bold",
  800: "NunitoSans_10pt_ExtraBold",
  900: "NunitoSans_10pt_Black",
};

export const TextNunitoSans = ({ style, ...props }: TextProps): JSX.Element => {
  const [fontsLoaded, fontError] = useFonts({
    NunitoSans_10pt_ExtraLight: require("@/assets/fonts/NunitoSans_10pt-ExtraLight.ttf"),
    NunitoSans_10pt_Light: require("@/assets/fonts/NunitoSans_10pt-Light.ttf"),
    NunitoSans_10pt_Regular: require("@/assets/fonts/NunitoSans_10pt-Regular.ttf"),
    NunitoSans_10pt_Medium: require("@/assets/fonts/NunitoSans_10pt-Medium.ttf"),
    NunitoSans_10pt_SemiBold: require("@/assets/fonts/NunitoSans_10pt-SemiBold.ttf"),
    NunitoSans_10pt_Bold: require("@/assets/fonts/NunitoSans_10pt-Bold.ttf"),
    NunitoSans_10pt_ExtraBold: require("@/assets/fonts/NunitoSans_10pt-ExtraBold.ttf"),
    NunitoSans_10pt_Black: require("@/assets/fonts/NunitoSans_10pt-Black.ttf"),
  });

  if (!fontsLoaded && !fontError) {
    return (
      <RNText style={[themeStyles.textBase, style]} {...props}>
        {props.children}
      </RNText>
    );
  }

  const fontFamily = regularMap[style?.fontWeight ?? 400];

  return (
    <RNText
      style={[themeStyles.textBase, style, { fontFamily: fontFamily }]}
      {...props}
    >
      {props.children}
    </RNText>
  );
};

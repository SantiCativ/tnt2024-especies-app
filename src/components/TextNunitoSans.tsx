import { TextProps, Text as RNText, TextStyle } from "react-native";
import { themeStyles } from "@/src/theme/theme";
import { useFonts } from "expo-font";

function fontWeightFromValue(value: number | string): string {
  switch (value) {
    case "100":
    case 100:
    case "thin":
      return "NunitoSans_10pt_ExtraLight";
    case "200":
    case 200:
    case "ultralight":
      return "NunitoSans_10pt_ExtraLight";
    case "300":
    case 300:
    case "light":
      return "NunitoSans_10pt_Light";
    case "400":
    case 400:
    case "normal":
    case "regular":
    case "condensed":
      return "NunitoSans_10pt_Regular";
    case "500":
    case 500:
    case "medium":
      return "NunitoSans_10pt_Medium";
    case "600":
    case 600:
    case "semibold":
      return "NunitoSans_10pt_SemiBold";
    case "700":
    case 700:
    case "bold":
    case "condensedBold":
      return "NunitoSans_10pt_Bold";
    case "800":
    case 800:
    case "extrabold":
      return "NunitoSans_10pt_ExtraBold";
    case "900":
    case 900:
    case "black":
    case "heavy":
      return "NunitoSans_10pt_Black";
    default:
      return "NunitoSans_10pt_Regular";
  }
}

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

  const fontFamily = fontWeightFromValue(
    (style as TextStyle)?.fontWeight ?? 400
  );

  return (
    <RNText
      style={[themeStyles.textBase, style, { fontFamily: fontFamily }]}
      {...props}
    >
      {props.children}
    </RNText>
  );
};

import { FC } from "react";
import { ImageBackground } from "expo-image";
import { Pressable, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { themeColors } from "@/src/theme/theme";
import {
  ReportCoordinates,
  useLocation,
} from "@/src/hooks/useLocation";

type ReportLocationProps = {
  onLocationSelected: (coords: ReportCoordinates) => void;
};

export const ReportLocation: FC<ReportLocationProps> = ({
  onLocationSelected,
}) => {
  const { getCurrentCoordinates } = useLocation();

  const handlePress = async () => {
    const coords = await getCurrentCoordinates();

    if (coords) {
      onLocationSelected(coords);
    }
  };

  return (
    <ImageBackground
      source={require("@/assets/images/map.png")}
      style={styles.map}
    >
      <Pressable style={styles.locationBtn} onPress={handlePress}>
        <MaterialIcons name="my-location" size={24} color="black" />
      </Pressable>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: 200,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  locationBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: themeColors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

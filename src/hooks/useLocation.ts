import { Alert } from "react-native";
import { openSettings } from "expo-linking";
import * as Location from "expo-location";

export type ReportCoordinates = {
  latitud: string;
  longitud: string;
};

export function useLocation() {
  const getCurrentCoordinates = async (): Promise<ReportCoordinates | null> => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permiso de localización denegado",
        "Por favor, habilita los permisos de localización en la configuración de tu dispositivo.",
        [
          { text: "Cancelar", style: "cancel" },
          { text: "Abrir configuración", onPress: () => openSettings() },
        ]
      );
      return null;
    }

    const location = await Location.getCurrentPositionAsync({});
    console.log(location);

    return {
      latitud: location.coords.latitude.toString(),
      longitud: location.coords.longitude.toString(),
    };
  };

  return { getCurrentCoordinates };
}

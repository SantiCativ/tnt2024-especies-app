import { useState } from "react";
import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { openSettings } from "expo-linking";

export function useGallery() {
  const [isPicking, setIsPicking] = useState(false);

  const requestGalleryAccess = async (): Promise<boolean> => {
    const currentPermission =
      await ImagePicker.getMediaLibraryPermissionsAsync();

    if (currentPermission.granted) {
      return true;
    }

    if (currentPermission.canAskAgain) {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      return status === "granted";
    }

    Alert.alert(
      "Permiso denegado",
      "No se puede acceder a la galería. Por favor, habilita el permiso en la configuración.",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Abrir configuración",
          onPress: () => openSettings(),
        },
      ]
    );
    return false;
  };

  const pickImage = async (): Promise<string | null> => {
    if (isPicking) return null;
    setIsPicking(true);
    try {
      const hasPermission = await requestGalleryAccess();
      if (!hasPermission) return null;

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        base64: true,
        quality: 1,
      });

      if (!result.canceled && result.assets?.[0]) {
        return result.assets[0].base64
          ? `data:image/jpeg;base64,${result.assets[0].base64}`
          : result.assets[0].uri;
      }

      return null;
    } finally {
      setIsPicking(false);
    }
  };

  return {
    isPicking,
    pickImage,
  };
}

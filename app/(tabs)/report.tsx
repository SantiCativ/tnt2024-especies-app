import { themeStyles } from "@/src/theme/theme";
import { useRef, useState } from "react";
import { Button, Platform, StyleSheet, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DateTimeModalInput } from "@/src/components/DateTimeModalInput";
import { Foundation } from "@expo/vector-icons";
import { Image } from "expo-image";
import { launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker";
import { CameraView, useCameraPermissions, CameraViewRef } from "expo-camera";
import { BotonReportar } from "@/src/components/BotonReportar";
import { InputsReport } from "@/src/components/InputsReport";
export default function ReportScreen() {
  

  const [imagen, setImagen] = useState<string | null>(null);

  const [showCamera, setShowCamera] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraViewRef>();

  const numberInputType: "numeric" | "numbers-and-punctuation" =
    Platform.select({
      default: "numeric",
      ios: "numbers-and-punctuation",
    });

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsMultipleSelection: false,
    });

    if (!result.canceled) {
      setImagen(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={themeStyles.screen}>
      <View style={styles.container}>
      <InputsReport/>
        <View
          style={{ flexDirection: "row", justifyContent: "center", gap: 10 }}
        >
          <Image
            source={imagen}
            placeholder={require("@/assets/images/placeholder.png")}
            placeholderContentFit="cover"
            style={{ width: 100, height: 100 }}
          />
          <View>
            {permission && permission.granted ? (
              <Foundation
                name="camera"
                size={40}
                color="white"
                onPress={() => {
                  setShowCamera(!showCamera);
                }}
              />
            ) : (
              <Button title="Permitir cámara" onPress={requestPermission} />
            )}

            <Foundation
              name="photo"
              size={40}
              color="white"
              onPress={pickImage}
            />
          </View>
        </View>
        {showCamera && (
          <View style={{ flexDirection: "row" }}>
            <CameraView
              ref={cameraRef}
              style={{ width: 200, height: 200 }}
              animateShutter={false}
              soun
            />
            <Button
              title="Tomar foto"
              onPress={async () => {
                const respuesta = await cameraRef.current?.takePictureAsync();
                setImagen(respuesta?.uri ?? null);
              }}
            />
          </View>
        )}
        <BotonReportar></BotonReportar>
      </View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    gap: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

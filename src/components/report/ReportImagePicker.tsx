import { FC } from "react";
import { Foundation, FontAwesome6 } from "@expo/vector-icons";
import { CameraView } from "expo-camera";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import {
  Modal,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { CustomButton } from "@/src/components/CustomButton";
import { useCamera } from "@/src/hooks/useCamera";

type ReportImagePickerProps = {
  image: string | null;
  onError: (error: string) => void;
  onImageChange: (image: string | null) => void;
};

export const ReportImagePicker: FC<ReportImagePickerProps> = ({
  image,
  onError,
  onImageChange,
}) => {
  const { width } = useWindowDimensions();
  const height = Math.round((width * 4) / 3);
  const {
    cameraRef,
    closeCamera,
    openCamera,
    permission,
    requestCameraAccess,
    showCamera,
    takePicture,
  } = useCamera();

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      onError("Permiso de acceso a la galería denegado");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
      quality: 1,
    });

    if (!result.canceled) {
      onImageChange(
        result.assets[0].base64
          ? `data:image/jpeg;base64,${result.assets[0].base64}`
          : null
      );
    }
  };

  const handleTakePicture = async () => {
    const photoUri = await takePicture();
    onImageChange(photoUri);
  };

  return (
    <View style={styles.imgCaptureContainer}>
      <Image
        source={image}
        placeholder={require("@/assets/images/placeholder.png")}
        placeholderContentFit="cover"
        style={styles.imagePreview}
      />
      <View>
        <Foundation
          name="camera"
          size={40}
          color="white"
          onPress={openCamera}
        />
        <Foundation name="photo" size={40} color="white" onPress={pickImage} />
      </View>

      <Modal
        visible={showCamera}
        transparent
        onRequestClose={closeCamera}
        statusBarTranslucent
      >
        <Pressable style={styles.cameraCloseContainer} onPress={closeCamera}>
          <Foundation
            name="x-circle"
            size={50}
            color="white"
            onPress={closeCamera}
            style={styles.cameraCloseBtn}
          />
          <View style={styles.cameraContainer}>
            <Pressable>
              <CameraView
                ref={cameraRef}
                style={[styles.camera, { width, height }]}
                animateShutter={false}
              />
            </Pressable>
            {permission?.granted ? (
              <FontAwesome6
                name="dot-circle"
                size={50}
                color="white"
                onPress={handleTakePicture}
              />
            ) : (
              <Pressable onPress={requestCameraAccess}>
                <CustomButton label="Permitir acceso a la camara" />
              </Pressable>
            )}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  imgCaptureContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  imagePreview: {
    width: 100,
    height: 100,
  },
  cameraCloseContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  cameraCloseBtn: {
    alignSelf: "flex-end",
    marginTop: 30,
    marginRight: 20,
  },
  cameraContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    gap: 30,
  },
  camera: {
    aspectRatio: 3 / 4,
    overflow: "hidden",
  },
});

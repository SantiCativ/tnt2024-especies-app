import { FC } from "react";
import { Foundation, FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { CameraView } from "expo-camera";
import { Image } from "expo-image";
import {
  ActivityIndicator,
  Modal,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { CustomButton } from "@/src/components/CustomButton";
import { useCamera } from "@/src/hooks/useCamera";
import { useGallery } from "@/src/hooks/useGallery";
import { themeColors } from "@/src/theme/theme";

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
    isCapturing,
    openCamera,
    permission,
    requestCameraAccess,
    showCamera,
    takePicture,
  } = useCamera();

  const { isPicking, pickImage } = useGallery();

  const handlePickImage = async () => {
    try {
      const imageUri = await pickImage();
      if (imageUri) {
        onImageChange(imageUri);
      }
    } catch (e) {
      onError("Error al seleccionar la imagen de la galería");
    }
  };

  const handleTakePicture = async () => {
    const photoUri = await takePicture();
    if (photoUri) {
      onImageChange(photoUri);
    }
  };

  const handleRemoveImage = () => {
    onImageChange(null);
  };

  return (
    <View style={styles.imgCaptureContainer}>
      <View style={styles.previewWrapper}>
        <Image
          source={image}
          placeholder={require("@/assets/images/placeholder.png")}
          placeholderContentFit="cover"
          style={styles.imagePreview}
        />
        {image && (
          <Pressable style={styles.removeImageBadge} onPress={handleRemoveImage}>
            <MaterialIcons name="close" size={18} color="white" />
          </Pressable>
        )}
      </View>
      <View style={styles.actionIconsContainer}>
        <Foundation
          name="camera"
          size={40}
          color="white"
          onPress={openCamera}
        />
        {isPicking ? (
          <ActivityIndicator size="small" color={themeColors.primary} />
        ) : (
          <Foundation
            name="photo"
            size={40}
            color="white"
            onPress={handlePickImage}
          />
        )}
      </View>

      <Modal
        visible={showCamera}
        transparent
        onRequestClose={closeCamera}
        statusBarTranslucent
      >
        <View style={styles.cameraCloseContainer}>
          <Pressable style={styles.cameraCloseBtn} onPress={closeCamera}>
            <Foundation name="x-circle" size={50} color="white" />
          </Pressable>
          <View style={styles.cameraContainer}>
            <CameraView
              ref={cameraRef}
              style={[styles.camera, { width, height }]}
              animateShutter={false}
            />
            {permission?.granted ? (
              isCapturing ? (
                <ActivityIndicator size="large" color="white" />
              ) : (
                <FontAwesome6
                  name="dot-circle"
                  size={50}
                  color="white"
                  onPress={handleTakePicture}
                />
              )
            ) : (
              <Pressable onPress={requestCameraAccess}>
                <CustomButton label="Permitir acceso a la cámara" />
              </Pressable>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  imgCaptureContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  previewWrapper: {
    position: "relative",
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  removeImageBadge: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "rgba(239, 68, 68, 0.9)",
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  actionIconsContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  cameraCloseContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "space-between",
    paddingBottom: 40,
  },
  cameraCloseBtn: {
    alignSelf: "flex-end",
    marginTop: 40,
    marginRight: 20,
  },
  cameraContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    gap: 20,
  },
  camera: {
    aspectRatio: 3 / 4,
    overflow: "hidden",
    borderRadius: 12,
  },
});



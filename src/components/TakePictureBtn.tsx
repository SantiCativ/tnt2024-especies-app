import { FontAwesome6, Foundation } from "@expo/vector-icons";
import { CameraView, CameraViewRef, useCameraPermissions } from "expo-camera";
import { openSettings } from "expo-linking";
import {
  Dispatch,
  FC,
  Fragment,
  SetStateAction,
  useRef,
  useState,
} from "react";
import {
  View,
  Modal,
  Pressable,
  useWindowDimensions,
  StyleSheet,
} from "react-native";
import { CustomButton } from "./CustomButton";

type TakePictureBtnProps = {
  setImagen: Dispatch<SetStateAction<string | null>>;
};
export const TakePictureBtn: FC<TakePictureBtnProps> = ({ setImagen }) => {
  const { width } = useWindowDimensions();
  const height = Math.round((width * 4) / 3);

  const [showCamera, setShowCamera] = useState<boolean>(false);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraViewRef>();

  const handleOpenCamera = () => {
    setShowCamera(true);
  };

  const handleCloseCamera = () => {
    setShowCamera(false);
  };

  const handlePermissions = async () => {
    if (!permission?.granted) {
      if (permission?.canAskAgain) {
        requestPermission();
      } else {
        openSettings();
      }
    }
  };

  const onTakePicture = async () => {
    const photo = await cameraRef.current?.takePictureAsync({ base64: true });
    setImagen(photo.base64 ? `data:image/jpeg;base64,${photo.base64}` : null);
    handleCloseCamera();
  };

  return (
    <Fragment>
      <Foundation
        name="camera"
        size={40}
        color="white"
        onPress={handleOpenCamera}
      />
      <Modal
        visible={showCamera}
        transparent
        onRequestClose={handleCloseCamera}
        statusBarTranslucent
      >
        <Pressable
          style={styles.cameraCloseContainer}
          onPress={handleCloseCamera}
        >
          <Foundation
            name="x-circle"
            size={50}
            color="white"
            onPress={handleCloseCamera}
            style={styles.cameraCloseBtn}
          />
          <View style={styles.cameraContainer}>
            <Pressable>
              <CameraView
                ref={cameraRef}
                style={[styles.camera, { width: width, height: height }]}
                animateShutter={false}
              />
            </Pressable>
            {permission?.granted ? (
              <FontAwesome6
                name="dot-circle"
                size={50}
                color="white"
                onPress={onTakePicture}
              />
            ) : (
              <Pressable onPress={handlePermissions}>
                <CustomButton label="Permitir acceso a la camara" />
              </Pressable>
            )}
          </View>
        </Pressable>
      </Modal>
    </Fragment>
  );
};

const styles = StyleSheet.create({
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

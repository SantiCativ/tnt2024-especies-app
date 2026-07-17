import { CameraView, useCameraPermissions } from "expo-camera";
import { openSettings } from "expo-linking";
import { useRef, useState } from "react";

export function useCamera() {
  const [showCamera, setShowCamera] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView | null>(null);

  const openCamera = () => {
    setShowCamera(true);
  };

  const closeCamera = () => {
    setShowCamera(false);
  };

  const requestCameraAccess = async () => {
    if (!permission?.granted) {
      if (permission?.canAskAgain) {
        await requestPermission();
      } else {
        openSettings();
      }
    }
  };

  const takePicture = async () => {
    const photo = await cameraRef.current?.takePictureAsync();
    closeCamera();
    return photo?.uri ?? null;
  };

  return {
    cameraRef,
    closeCamera,
    openCamera,
    permission,
    requestCameraAccess,
    showCamera,
    takePicture,
  };
}

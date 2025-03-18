import { ImageBackground } from "expo-image";
import { StyleSheet, Pressable,Alert } from "react-native";
import { themeColors } from "@/src/theme/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { Dispatch, FC, SetStateAction } from "react";
import * as Location from "expo-location";
import { openSettings } from "expo-linking";

type MapProps = {
  setLatitud: Dispatch<SetStateAction<string>>;
  setLongitud: Dispatch<SetStateAction<string>>;
};
export const Map: FC<MapProps> = ({ setLatitud, setLongitud }) => {

  const handlePress = async () => {
    


     // Pedir permiso de localización
     let { status } = await Location.requestForegroundPermissionsAsync();
    
     if (status !== 'granted') {
       // Si el permiso fue rechazado, mostrar alerta y abrir configuración
       Alert.alert(
         "Permiso de localización denegado",
         "Por favor, habilita los permisos de localización en la configuración de tu dispositivo.",
         [
           { text: "Cancelar", style: "cancel" },
           { text: "Abrir configuración", onPress: () => openSettings() }
         ]
       );
       return;
     }
 
     // Obtener la posición actual
     let location = await Location.getCurrentPositionAsync({});
     setLatitud(location.coords.latitude.toString());
     setLongitud(location.coords.longitude.toString());
     console.log(location);
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

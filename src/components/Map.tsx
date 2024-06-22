import { ImageBackground } from "expo-image";
import { StyleSheet, Pressable } from "react-native";
import { themeColors } from "@/src/theme/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { Dispatch, FC, SetStateAction } from "react";

type MapProps = {
  setLatitud: Dispatch<SetStateAction<string>>;
  setLongitud: Dispatch<SetStateAction<string>>;
};
export const Map: FC<MapProps> = ({ setLatitud, setLongitud }) => {

  const handlePress = async () => {
    // TODO: si el permiso fue rechazado, abrir configuracion

    // TODO: Si el permiso podemos pregunta, preguntamos

    // TODO: Si tenmos acceso, nos quedamos con la posicion y seteamos latitud y longitud
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

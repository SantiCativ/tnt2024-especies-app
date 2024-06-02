import { TEspecie } from "../services/especies.service";
import {
  ImageBackground,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import { TextNunitoSans } from "@/src/components/TextNunitoSans";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export const EspecieHeader: React.FC<{ especie: TEspecie }> = ({ especie }) => {
  const navigation = useNavigation();
  return (
    <ImageBackground
      source={
        especie.imagen
          ? { uri: especie.imagen }
          : require("@/assets/images/placeholder.png")
      }
      resizeMode="cover"
      style={styles.image}
    >
      <View style={styles.IconBackContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={styles.IconBackCircleContainer}>
            <Ionicons name="chevron-back-outline" size={40} color="black" />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.absoluteContainer}>
        <View style={styles.IconLikeContainer}>
          <FontAwesome name="heart" size={24} color="#EF5DA8" />
          <TextNunitoSans style={{ fontSize: 12, color: "black" }}>
            {especie.likes} likes
          </TextNunitoSans>
        </View>
      </View>

      <View style={styles.textContainer}>
        <TextNunitoSans style={styles.text}>
          {" "}
          {especie.nombre_cientifico}
        </TextNunitoSans>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    margin: 30,
    justifyContent: "center",
  },
  IconBackContainer: {
    padding: 10,
  },
  IconBackCircleContainer: {
    backgroundColor: "white",
    width: 45,
    height: 45,
    borderRadius: 60,
  },
  absoluteContainer: {
    position: "absolute", // nos da la posicion absoluta, en este caso la de imagen, de esta manera con top y right, controlamos esas posiciones TOMANDO COMO REFERENCIA LA IMAGEN
    top: 0,
    right: 0,
    padding: 15, //distancia entre este contenedor y sus hijos
  },
  IconLikeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    backgroundColor: "white",
    width: 90,
    height: 38,
    borderRadius: 20,
  },
  textContainer: {
    flex: 1, // Make the container take up the full height
    justifyContent: "flex-end", // Align content at the bottom
    alignItems: "flex-start", // Align text to the left edge
  },
  text: {
    color: "white",
    fontSize: 25,
    textAlign: "center",
  },
});

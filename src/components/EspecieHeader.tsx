import { TEspecie } from "../services/especies.service";
import {
  ImageBackground,
  StyleSheet,
  View,
  TouchableOpacity,
  Pressable,
  Dimensions,
} from "react-native";
import { TextNunitoSans } from "@/src/components/TextNunitoSans";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

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
          <View style={styles.IconBackCircleContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back-outline" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </View>
     

      <View style={styles.absoluteContainer}>
        <View style={styles.IconLikeContainer}>
          <FontAwesome name="heart" size={24} color="#EF5DA8" />
          <TextNunitoSans style={{ fontSize: 12, color: "black" }}>
            {especie.likes} likes
          </TextNunitoSans>
        </View>
      </View>

      <LinearGradient
        start={{ x: 0.5, y: 1 }}
        end={{ x: 0.5, y: 0 }}
        colors={["rgba(48,49,45,1)", "rgba(48,49,45,0.9)", "rgba(30,31,24,0)"]}
        locations={[0, 0.34, 0.9]}
        style={styles.linearGradient}
      >
        <View style={styles.textContainer}>
          <TextNunitoSans style={styles.text}>
            {especie.nombre_cientifico}
          </TextNunitoSans>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    height: Dimensions.get("window").height / 2,
    marginTop: 38,
    margin: 15,
    justifyContent: "center",
    borderRadius: 20,
  },
  linearGradient: {
    height: Dimensions.get("window").height / 2,
    justifyContent: "flex-end",
    paddingBottom: 40,
    paddingHorizontal: 10,
  },
  IconBackContainer: {
    top: 30,
    padding: 15, //distancia entre este contenedor y sus hijos
  },
  IconBackCircleContainer: {
    backgroundColor: "white",
    width: 30,
    height: 30,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
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
    justifyContent: "flex-end", // Align content at the bottom
    alignItems: "flex-start", // Align text to the left edge
  },
  text: {
    color: "white",
    fontSize: 25,
    textAlign: "center",
  },
});

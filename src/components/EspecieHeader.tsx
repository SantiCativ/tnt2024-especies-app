import { TEspecie } from "../services/especies.service";
import {
  ImageBackground,
  StyleSheet,
  View,
  Pressable,
  Dimensions,
} from "react-native";
import { TextNunitoSans } from "@/src/components/TextNunitoSans";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router"
import { useLikes } from "../hooks/useLikes";

export const EspecieHeader: React.FC<{ especie: TEspecie }> = ({ especie }) => {
  const { back } = useRouter();
  const {
    likesCount,
    hasLiked,
    toggleLike
  } = useLikes(especie.sp_id);

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
          <Pressable onPress={back}>
            <Ionicons name="chevron-back-outline" size={30} color="black" />
          </Pressable>
        </View>
      </View>


      <View style={styles.absoluteContainer}>
        <Pressable
          style={styles.IconLikeContainer}
          onPress={toggleLike}
          hitSlop={10}
        >
          <FontAwesome
            name="heart"
            size={24}
            color={hasLiked ? "#EF5DA8" : "#C8C8C8"}
          />


          <TextNunitoSans style={{ color: "black" }}>
            {likesCount ?? ""}
          </TextNunitoSans>

        </Pressable>
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
    shadowRadius: 20,
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
    position: "absolute",
    top: 0,
    right: 0,
    padding: 15,
    zIndex: 10,
    elevation: 10,
  },
  IconLikeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    backgroundColor: "white",
    width: 90,
    minHeight: 44,
    paddingHorizontal: 12,
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

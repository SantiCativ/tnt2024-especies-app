import { TextNunitoSans } from "@/src/components/TextNunitoSans";
import { themeColors } from "@/src/theme/theme";
import { FontAwesome } from "@expo/vector-icons";
import { ImageBackground } from "expo-image";
import { Link } from "expo-router";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { TEspecie } from "@/src/services/especies.service";

export function EspecieHeader({ especie }: { especie: TEspecie }) {
  const { width, height } = useWindowDimensions();
  return (
    <ImageBackground
      source={especie.imagen}
      style={[
        styles.imgBackgroundContainer,
        { width: width, height: height * 0.5 },
      ]}
      contentFit="cover"
      placeholder={require("@/assets/images/placeholder.png")}
    >
      <View style={styles.topHeaderContainer}>
        <Link href="/(tabs)" style={styles.backBtnLink}>
          <View style={styles.backBtnContainer}>
            <FontAwesome
              name="chevron-left"
              size={24}
              color={themeColors.screenBackground}
              style={styles.backBtn}
            />
          </View>
        </Link>
        <View style={styles.likesBtnContainer}>
          <FontAwesome name="heart" size={14} color={themeColors.heart} />
          <TextNunitoSans style={styles.likesText}>0 likes</TextNunitoSans>
        </View>
      </View>

      <LinearGradient
        start={{ x: 0.5, y: 1 }}
        end={{ x: 0.5, y: 0 }}
        colors={[
          "rgba(48, 49, 45, 1)",
          "rgba(48, 49, 45, 0.9)",
          "rgba(30, 31, 24, 0)",
        ]}
        locations={[0, 0.34, 0.68]}
        style={styles.linearGradient}
      >
        <TextNunitoSans style={styles.title}>
          {especie.nombre_cientifico}
        </TextNunitoSans>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imgBackgroundContainer: {
    paddingTop: 60,
    justifyContent: "space-between",
  },
  topHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  backBtnLink: { padding: 5 },
  backBtnContainer: {
    borderRadius: 25,
    width: 34,
    height: 34,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  backBtn: {
    marginTop: 2,
    marginRight: 4,
  },
  likesBtnContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    borderRadius: 25,
    padding: 8,
  },
  likesText: { color: "black" },
  title: {
    fontSize: 24,
    fontWeight: 700,
  },
  linearGradient: {
    height: 300,
    justifyContent: "flex-end",
    paddingBottom: 40,
    paddingHorizontal: 10,
  },
});

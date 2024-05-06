import { EspecieDetail } from "@/src/components/EspecieDetail";
import { Text } from "@/src/components/Text";
import { useEspecie } from "@/src/services/especies.hooks";
import { themeColors, themeStyles } from "@/src/theme/theme";
import { FontAwesome } from "@expo/vector-icons";
import { ImageBackground } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { Link } from "expo-router";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { EspecieHeader } from "@/src/components/EspecieHeader";

export default function EspecieShowScreen() {
  const searchParams = useLocalSearchParams();

  const spId =
    typeof searchParams.especieId === "string"
      ? parseInt(searchParams.especieId)
      : 1;

  const { data: especie, isFetching, isError } = useEspecie(spId);

  if (isFetching) {
    return (
      <View style={styles.container}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.container}>
        <Text>ERROR!</Text>
      </View>
    );
  }

  if (!especie) {
    return (
      <View style={styles.container}>
        <Text>La especie no existe</Text>
      </View>
    );
  }

  return (
    <View style={themeStyles.screen}>
      <EspecieHeader especie={especie} />
      <EspecieDetail especie={especie} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

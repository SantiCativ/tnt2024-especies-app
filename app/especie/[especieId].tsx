import { EspecieDetail } from "@/src/components/EspecieDetail";
import { TextNunitoSans } from "@/src/components/TextNunitoSans";
import { useEspecie } from "@/src/services/especies.hooks";
import { themeStyles } from "@/src/theme/theme";
import { useLocalSearchParams } from "expo-router"; //biblioteca para recuperar los parámetros de búsqueda para el contexto de la ruta actual.
import { StyleSheet, View, ScrollView } from "react-native";
import { EspecieHeader } from "@/src/components/EspecieHeader";

function parseEspecieId(especieId: string | string[] | undefined) {
  if (typeof especieId !== "string") {
    return null;
  }

  const parsedId = Number(especieId);
  return Number.isInteger(parsedId) && parsedId > 0 ? parsedId : null;
}

export default function EspecieShowScreen() {
  const searchParams = useLocalSearchParams();

  //obtenemos id de la ruta
  const spId = parseEspecieId(searchParams.especieId);

  if (spId === null) {
    return (
      <View style={styles.container}>
        <TextNunitoSans>El id de la especie no es valido</TextNunitoSans>
      </View>
    );
  }

  return <EspecieDetailScreen spId={spId} />;
}

function EspecieDetailScreen({ spId }: { spId: number }) {
  const { data: especie, isFetching, isError } = useEspecie(spId);

  if (isFetching) {
    return (
      <View style={styles.container}>
        <TextNunitoSans>Cargando...</TextNunitoSans>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.container}>
        <TextNunitoSans>ERROR!</TextNunitoSans>
      </View>
    );
  }

  if (!especie) {
    return (
      <View style={styles.container}>
        <TextNunitoSans>La especie no existe</TextNunitoSans>
      </View>
    );
  }

  return (
    <ScrollView
      style={themeStyles.screen}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <EspecieHeader especie={especie} />
      <EspecieDetail especie={especie} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContent: {
    paddingBottom: 40,
  },
});

import { EspecieList } from "@/src/components/EspecieList";
import { HomeFilter } from "@/src/components/HomeFilter";
import { TextNunitoSans } from "@/src/components/TextNunitoSans";
import { useFilteredEspecies } from "@/src/services/especies.hooks";
import { TReino, TReinoEnum } from "@/src/services/especies.service";
import { themeColors, themeStyles } from "@/src/theme/theme";
import { useState } from "react";
import {
  Button,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";

export default function HomeScreen() {
  const [filter, setFilter] = useState<TReino | null>(null);

  

  const {
    data: especies, // renombro data a especies
    isFetching,
    isError,
    refetch,
  } = useFilteredEspecies(filter);

  //
  // Event handlers
  //
  const handleRemoveFilter = () => {
    setFilter(null);
  };

  // función que recibe un parámetro y retorna otra la definición de otra función
  const handleFilter = (reino: TReino) => () => {
    setFilter(reino);
  };

  const handleReintentar = () => {
    // solo ejecuta refetch si refetch no es falsy
    refetch?.();
  };

  //
  // Render
  //
  return (
    <SafeAreaView style={themeStyles.screen}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <TextNunitoSans style={styles.title}>Hola Usuario</TextNunitoSans>
          <View style={styles.filtersContainer}>
            <Pressable onPress={handleRemoveFilter} >
              <HomeFilter filter={filter} name={null} />
            </Pressable>
            <Pressable onPress={handleFilter(TReinoEnum.ANIMALIA)}>
              <HomeFilter filter={filter} name={TReinoEnum.ANIMALIA} />
            </Pressable>
            <Pressable onPress={handleFilter(TReinoEnum.FUNGI)}>
              <HomeFilter filter={filter} name={TReinoEnum.FUNGI} />
            </Pressable>
            <Pressable onPress={handleFilter(TReinoEnum.PLANTAE)}>
              <HomeFilter filter={filter} name={TReinoEnum.PLANTAE} />
            </Pressable>
          </View>
        </View>

        {isFetching && <TextNunitoSans>Cargando...</TextNunitoSans>}
        {!isFetching && isError && (
          <View>
            <TextNunitoSans style={styles.textError}>
              Error al cargar las especies
            </TextNunitoSans>
            <Button title="Reintentar" onPress={handleReintentar} />
          </View>
        )}
        
        <TextNunitoSans style={styles.textError}>
              
            </TextNunitoSans>
        
        <EspecieList especies={especies} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    gap: 10,
  },
  filtersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: themeColors.textBase,
  },
  titleContainer: { gap: 35 },
  textError: {
    color: "red",
  },
});

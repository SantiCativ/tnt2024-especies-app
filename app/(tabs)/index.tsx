import {
  EspecieHome,
  preparaEspeciesParaHome,
} from "@/src/adapters/homeAdapters";
import {
  TReino,
  TReinoEnum,
  getEspecies,
} from "@/src/services/especies.service";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { useEffect, useState, useRef } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  //arreglo de Especies Home, inicialmente vacio.
  const [especiesFiltradas, setEspeciesFiltradas] = useState<EspecieHome[]>([]);
  const especiesRef = useRef<EspecieHome[]>([]);

  useEffect(() => {
    fetchEspecies();
  }, []);

  const fetchEspecies = async () => {
    setIsFetching(true);
    setIsError(false);
    try {
      const espciesFromApi = await getEspecies();
      especiesRef.current = preparaEspeciesParaHome(espciesFromApi);
      setEspeciesFiltradas(especiesRef.current);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsFetching(false);
    }
  };

  const handleRemoveFilter = () => {
    setEspeciesFiltradas(especiesRef.current);
  };

  const handleFilter = (reino: TReino) => () => {
    const newEspecies = especiesRef.current.filter(
      (especie) => especie.reino === reino
    );
    setEspeciesFiltradas(newEspecies);
  };

  console.log("HomeScreen render");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>

      <Pressable onPress={handleRemoveFilter}>
        <Text>Todess</Text>
      </Pressable>
      <Pressable onPress={handleFilter(TReinoEnum.ANIMALIA)}>
        <Text>Animalia</Text>
      </Pressable>
      <Pressable onPress={handleFilter(TReinoEnum.PLANTAE)}>
        <Text>Fungi</Text>
      </Pressable>
      <Pressable onPress={handleFilter(TReinoEnum.FUNGI)}>
        <Text>Plantae</Text>
      </Pressable>

      {isFetching && <Text>Cargando...</Text>}
      {isError && (
        <Text style={{ color: "red" }}>Error al cargar las especies, prueba de vuelta</Text>
      )}

      <FlatList
        style={{ maxHeight: 300 }}
        keyExtractor={(item) => item.sp_id.toString()}
        data={especiesFiltradas}
        renderItem={({ item }) => (
          <View key={item.sp_id}>
            <Image
              source={{ uri: item.imagen }}
              style={{ width: 50, height: 50 }}
            />
            <Text>{item.nombre_cientifico}</Text>
          </View>
        )}
      />

      <Pressable onPress={fetchEspecies}>
        <Text>Recargar</Text>
      </Pressable>
      <Link href="/especie/1">To Especie show</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

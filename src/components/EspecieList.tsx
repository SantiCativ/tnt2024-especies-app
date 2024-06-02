import React from "react";
import { FlatList, Image, StyleSheet, View, Pressable } from "react-native";
import { EspecieHome } from "../adapters/homeAdapters";
import { TextNunitoSans } from "@/src/components/TextNunitoSans";
import { Link } from "expo-router";

//COMPONENTE CARD
//Aca recibe como accesorio el especie, el cual tiene que ir tipado sino da error
//basicamente una funcion que recibe el detalle de solo una especie y juega con sus datos para devolverve
//su respectiva card
const EspecieCard: React.FC<{ especie: EspecieHome }> = ({ especie }) => {
  return (
    <View style={styles.card}>
      <Image
        //aca debo manejar el camino si la imagen es nula, debido al tipado que hicimos en especieHome
        source={
          especie.imagen
            ? { uri: especie.imagen }
            : require("@/assets/images/placeholder.png") //si la imagen es nula muestro una de imagen estatica default
        }
        style={styles.cardImage}
      />

      {especie.imagen ? (
        <TextNunitoSans style={styles.cardText} numberOfLines={1}>
          {especie.nombre_cientifico}
        </TextNunitoSans>
      ) : (
        <TextNunitoSans style={styles.cardText}>
          Especie sin imagen
        </TextNunitoSans>
      )}
    </View>
  );
};

//Componente que está diseñado específicamente para representar una lista de tarjetas de especies.
//El componente se define usando el React.FCtipo, lo que indica que es un componente funcional en React.
export const EspecieList: React.FC<{ especies: EspecieHome[] }> = ({
  especies,
}) => {
  return (
    <FlatList
      data={especies}
      renderItem={({ item }) => (
        <Link
          href={{
            pathname: "/especie/[especieId]",
            params: { especieId: item.sp_id },
          }}
           asChild //esta propiedad permite que a los componentes hijos no lo tome como una etiqueta <a> sino como una unidad direccionable
        >
          {/* Meto Pressable para que me tome el link en android */}
          <Pressable>
            <EspecieCard key={item.sp_id.toString()} especie={item} />
          </Pressable>
        </Link>
      )}
      keyExtractor={(item) => item.sp_id.toString()}
      numColumns={2}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: "column", //dispone los elementos HIJOS (imagen y nombre) verticalmente, uno debajo del otro.
    alignItems: "center", //alinea centralmente los elementos secundarios(hijos)
    width: 145,
    height: 174.01,
    margin: 10,
    gap: 5,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#363636",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  cardImage: {
    width: 127.84,
    height: 133.79,
    borderRadius: 30,
  },
  cardText: {
    fontSize: 9,
    fontWeight: 600,
  },
});

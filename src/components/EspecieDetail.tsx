import { TEspecie } from "../services/especies.service";
import { FlatList, Text, View, Image } from "react-native";

//recibimos como argumento el objeto unico de la especie de
export const EspecieDetail: React.FC<{ especie: TEspecie }> = ({ especie }) => {
  const propiedades = Object.entries(especie); // Convertimos el objeto en un array de pares clave-valor

  return (
    <View>
      {propiedades.map(([clave, valor]) => (
        <View style={{ flexDirection: 'row' }} key={clave}>
          <Text style={{ color: 'green' }}>{clave}:</Text>
          <Text>{valor}</Text>
          </View>
      ))}
    </View>
  );
};


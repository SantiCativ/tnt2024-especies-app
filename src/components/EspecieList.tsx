import { FlatList, StyleSheet, View } from "react-native";
import { EspecieCard } from "./EspecieCard";
import { FC } from "react";
import { EspecieHome } from "@/src/adapters/homeAdapters";
import { Link } from "expo-router";

export type EspecieListProps = {
  especies: EspecieHome[];
};
export const EspecieList: FC<EspecieListProps> = ({ especies }) => (
  <FlatList
    numColumns={2}
    keyExtractor={(item) => item.sp_id.toString()}
    data={especies}
    columnWrapperStyle={styles.columnWrapper}
    contentContainerStyle={styles.contentContainer}
    ListHeaderComponent={() => <View style={styles.separator} />}
    ListFooterComponent={() => <View style={styles.separator} />}
    renderItem={({ item }) => (
      <Link
        href={{
          pathname: "/especie/[especieId]",
          params: { especieId: item.sp_id },
        }}
        key={item.sp_id}
      >
        <EspecieCard name={item.nombre_cientifico} imageUrl={item.imagen} />
      </Link>
    )}
  />
);

const styles = StyleSheet.create({
  columnWrapper: { justifyContent: "space-between" },
  contentContainer: { gap: 15 },
  separator: { height: 10 },
});

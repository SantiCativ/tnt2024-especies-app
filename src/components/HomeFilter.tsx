import {  StyleSheet, Text } from "react-native";

export const HomeFilter: React.FC<{ filter: any; name: string | null }> = ({
  filter,
  name,
}) => {
  return (
    <Text
      style={
        filter === name ? styles.filterCategorySelected : styles.filterCategory
      }
    >
      {name ? name : "TODOS"}
    </Text>
  );
};

const styles = StyleSheet.create({
  filterCategory: {
    color: "white",
  },
  filterCategorySelected: {
    color:"white",
    borderBottomWidth: 1, // Ancho del borde inferior
    borderBottomColor: '#BEDE61', // Color del borde inferior
    
  },
});


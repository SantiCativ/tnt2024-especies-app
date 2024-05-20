import { Pressable, StyleSheet, Text } from "react-native";

export const HomeFilter: React.FC<{ filter: any; name: string | null }> = ({
  filter,
  name,
}) => {
  return (
    //<Text style={styles.filterCategory}>{name ? name : 'TODOS'}</Text>
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
    color: "#BEDE61",
    textDecorationLine: "underline"
    
  },
});

// export const HomeFilter = (filter: any, name: string | null) => {
//   return <Text style={styles.filterText}>{name ? name : "TODOS"}</Text>;
// };

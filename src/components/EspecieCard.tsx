import { Image } from "expo-image";
import { FC } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { TextNunitoSans } from "./TextNunitoSans";

export type EspecieCardProps = {
  name: string;
  imageUrl: string | null;
};
export const EspecieCard: FC<EspecieCardProps> = ({ name, imageUrl }) => {
  return (
    <View style={styles.card}>
      <Image
        source={imageUrl}
        style={styles.image}
        placeholder={require("@/assets/images/placeholder.png")}
        placeholderContentFit="cover"
      />
      <TextNunitoSans numberOfLines={1} style={styles.cardTitle}>
        {name}
      </TextNunitoSans>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#363636",
    borderRadius: 17,
    padding: 20,
    width: Dimensions.get("window").width * 0.4,
    height: 186,
    gap: 5,
  },
  image: {
    width: "auto",
    height: 135,
    borderRadius: 17,
  },
  cardTitle: {
    fontWeight: "600",
  },
});

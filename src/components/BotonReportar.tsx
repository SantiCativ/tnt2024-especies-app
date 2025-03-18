
import { Link } from "expo-router";
import { Pressable, View, StyleSheet } from "react-native";
import { TextNunitoSans } from "@/src/components/TextNunitoSans";

export const BotonReportar = () => {

    return (
      <Link
        href={{
          pathname: "/report",
        }}
        asChild
      >
        <Pressable style={styles.ContainerBoton}>
          <View style={styles.botton}>
            <TextNunitoSans>Reportar Avistaje</TextNunitoSans>
          </View>
        </Pressable>
      </Link>
    );
  };


  const styles = StyleSheet.create({
    ContainerBoton: {
      alignItems: "center",
      justifyContent: "center",
    },
    botton: {
      width: 173,
      height: 46,
      borderRadius: 30,
      backgroundColor: "#BEDE61",
      alignItems: "center",
      justifyContent: "center",
    },
  });
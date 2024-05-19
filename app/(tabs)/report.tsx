import { themeStyles } from "@/src/theme/theme";
import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ReportScreen() {
  const [descripcion, setDescripcion] = useState("");
  return (
    <SafeAreaView style={themeStyles.screen}>
      <View style={styles.container}>
        <TextInput
          placeholder="Descripción"
          onChangeText={setDescripcion}
          value={descripcion}
          style={{
            height: 50,
            width: 300,
            backgroundColor: "white",
            borderRadius: 30,
            paddingLeft: 20,
            paddingRight: 3,
          }}
        />
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

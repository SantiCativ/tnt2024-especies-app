import { ReportForm } from "@/src/components/report/ReportForm";
import { useAuth } from "@/src/context/AuthContext";
import { ActivityIndicator, Alert, StyleSheet, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { themeColors } from "@/src/theme/theme";
import { useEffect } from "react";
import { router } from "expo-router";
import { useIsFocused } from "@react-navigation/native";


export default function ReportScreen() {
  const params = useLocalSearchParams<{ reportSpId?: string }>();
  const { user, loading } = useAuth();
  const isFocused = useIsFocused();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color={themeColors.primary}
        />
      </View>
    );
  }

  useEffect(() => {
    if (!loading && !user && isFocused) {
      router.push("/login");
    }
  }, [loading, user, isFocused]);

  return (
    <ReportForm
      initialSpId={params.reportSpId ?? null}
      onSubmitSuccess={() => {
        Alert.alert("¡Éxito!", "El reporte de avistaje ha sido enviado con éxito.");
      }}
      onSubmitError={(message) => {
        Alert.alert(
          "Error al enviar el reporte",
          message || "Inténtelo de nuevo más tarde."
        );
      }}
    />
  );
}


const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: themeColors.screenBackground,
  },
});
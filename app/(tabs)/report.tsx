import { ReportForm } from "@/src/components/report/ReportForm";
import { useAuth } from "@/src/context/AuthContext";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { themeColors } from "@/src/theme/theme";
import { useEffect } from "react";
import { router } from "expo-router";


export default function ReportScreen() {
  const params = useLocalSearchParams<{ reportSpId?: string }>();
  const { user, loading } = useAuth();

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
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user]);

  return (
    <ReportForm
      initialSpId={params.reportSpId ?? null}
      onSubmitSuccess={() => {
        console.log("Reporte enviado con exito");
      }}
      onSubmitError={(message) => {
        console.error(
          "Error al enviar el reporte",
          message
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
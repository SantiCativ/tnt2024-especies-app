import { ConfirmModal } from "@/src/components/ConfirmModal";
import { EspecieList } from "@/src/components/EspecieList";
import { HomeFilter } from "@/src/components/HomeFilter";
import { ProgressLoading } from "@/src/components/ProgressLoading";
import { TextNunitoSans } from "@/src/components/TextNunitoSans";
import { useFilteredEspecies } from "@/src/services/especies.hooks";
import { TReino, TReinoEnum } from "@/src/services/especies.service";
import { themeColors, themeStyles } from "@/src/theme/theme";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/src/context/AuthContext";

export default function HomeScreen() {
  const { user, logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [filter, setFilter] = useState<TReino | null>(null);
  const displayName =
    user?.email?.split("@")[0] ?? "Anónimo";

  const {
    data: especies, // renombro data a especies
    isFetching,
    isError,
    refetch,
  } = useFilteredEspecies(filter);

  //
  // Event handlers
  //
  const handleRemoveFilter = () => {
    setFilter(null);
  };

  // función que recibe un parámetro y retorna otra la definición de otra función
  const handleFilter = (reino: TReino) => () => {
    setFilter(reino);
  };

  const handleReintentar = () => {
    // solo ejecuta refetch si refetch no es falsy
    refetch?.();
  };

  const handleLogout = () => {
    logout();
    setShowLogoutModal(false);
  };

  //
  // Render
  //
  return (
    <SafeAreaView style={themeStyles.screen}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <StatusBar style="light" />
          <View style={styles.titleRow}>
            <TextNunitoSans style={styles.title}>Hola {displayName}</TextNunitoSans>
            {user && (
              <Pressable onPress={() => setShowLogoutModal(true)}>
                <Ionicons name="log-out-outline" size={26} color={themeColors.textBase} />
              </Pressable>
            )}
          </View>

          <View style={styles.filtersContainer}>
            <Pressable onPress={handleRemoveFilter} hitSlop={10}>
              <HomeFilter filter={filter} name={null} />
            </Pressable>
            <Pressable onPress={handleFilter(TReinoEnum.ANIMALIA)} hitSlop={10}>
              <HomeFilter filter={filter} name={TReinoEnum.ANIMALIA} />
            </Pressable>
            <Pressable onPress={handleFilter(TReinoEnum.FUNGI)} hitSlop={10}>
              <HomeFilter filter={filter} name={TReinoEnum.FUNGI} />
            </Pressable>
            <Pressable onPress={handleFilter(TReinoEnum.PLANTAE)} hitSlop={10}>
              <HomeFilter filter={filter} name={TReinoEnum.PLANTAE} />
            </Pressable>
          </View>
        </View>

        {isFetching ? (
          <View style={styles.centerContainer}>
            <ProgressLoading text="Cargando especies..." />
          </View>
        ) : isError ? (
          <View style={styles.centerContainer}>
            <TextNunitoSans style={styles.textError}>
              Error al cargar las especies
            </TextNunitoSans>
            <Button title="Reintentar" onPress={handleReintentar} color={themeColors.primary} />
          </View>
        ) : (
          <EspecieList especies={especies} />
        )}

        <ConfirmModal
          visible={showLogoutModal}
          title="Cerrar sesión"
          message="¿Estás seguro de que deseas cerrar sesión?"
          confirmLabel="Cerrar sesión"
          cancelLabel="Cancelar"
          onConfirm={handleLogout}
          onCancel={() => setShowLogoutModal(false)}
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
  filtersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    paddingTop: 20,
    fontSize: 20,
    fontWeight: "bold",
    color: themeColors.textBase,
  },
  titleContainer: { gap: 35 },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textError: {
    color: "red",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
});

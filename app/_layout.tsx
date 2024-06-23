// import { EspecieProvider } from "@/src/context/especies.context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";

// Seteamos la ruta inicial
export const unstable_settings = {
  initialRouteName: "(tabs)",
};

// Creamos una instancia de QueryClient, "configuración global de de Tanstack Query"
const queryClient = new QueryClient();

// Layout principal de la aplicación
export default function RootLayout() {
  return (
    // Proveedor de Tanstack Query
    <QueryClientProvider client={queryClient}>
      {/* Navegación principal, dos Stacks: (tabs) y la pantalla de detalle de una especie */}
      {/* Seguir en app/(tabs)/_layout ¿Por qué? Porque la ruta inicial arriba en "unstable_settings" */}
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="especie/[especieId]"
          options={{ headerShown: false }}
          
        />
      </Stack>
    </QueryClientProvider>
  );
}

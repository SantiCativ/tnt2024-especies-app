import { Foundation, FontAwesome5 } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { themeColors } from "@/src/theme/theme";

export default function TabLayout() {
  // definimos un Layout de Tabs con dos pantallas
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: themeColors.primary,
        tabBarInactiveTintColor: "#787878",
        tabBarStyle: {
          backgroundColor: themeColors.screenBackground,
        },
      }}
    >
      <Tabs.Screen
        // Esta ruta será la principal porque index es la primer ruta que busca en la carpeta
        name="index"
        options={{
          title: "", // evito mostrar label debajo del icono
          tabBarIcon: ({ color }) => (
            <Foundation name="home" size={24} color={color} />
          ),
        }}
        
      />
      <Tabs.Screen
        name="report"
        options={{
          title: "", // evito mostrar label debajo del icono
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="edit" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

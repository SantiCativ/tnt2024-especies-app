
## Puesta en marcha

1. Clonar el repo
2. Duplicar archivo `.env.example` y renombrar a `.env.local`
3. `npm install`
4. `npm run [ios|web|android]`


# UNTDF - TNT2024

Proyecto: EspeciesApp

Tipo:
App Expo / React Native a desarrollar durante la cursada 2024 de la cátedra de Taller de Nuevas tecnologías de la UNTDF. Permite consultar especies, filtrarlas por reino y reportar avistajes.

Stack principal:
- Expo SDK 51
- React Native 0.74
- TypeScript strict
- expo-router para navegación por archivos
- TanStack React Query para fetching/cache
- axios para HTTP
- expo-camera, expo-image-picker y expo-location para cámara, galería y ubicación
- expo-image para imágenes
- Nunito Sans como fuente custom

Estructura:
- app/_layout.tsx: layout raíz. Crea QueryClientProvider y Stack principal.
- app/(tabs)/_layout.tsx: layout de tabs. Tiene dos pestañas: home y report.
- app/(tabs)/index.tsx: pantalla home. Lista especies y filtra por reino.
- app/(tabs)/report.tsx: formulario para reportar un avistaje.
- app/especie/[especieId].tsx: detalle de una especie según id de ruta.
- src/services/especies.service.ts: funciones HTTP y tipos principales.
- src/services/especies.hooks.ts: hooks con React Query.
- src/adapters/homeAdapters.ts: adapta TEspecie al modelo liviano EspecieHome.
- src/components/: componentes visuales reutilizables.
- src/theme/theme.ts: colores y estilos globales.

Modelo principal:
TEspecie representa una especie:
- sp_id
- reino
- phydiv
- clase
- orden
- familia
- nombre_cientifico
- origen
- imagen

Reinos posibles:
- ANIMALIA
- PLANTAE
- FUNGI

Flujo de datos:
1. La app arranca en app/_layout.tsx.
2. QueryClientProvider habilita React Query para toda la app.
3. Home usa useFilteredEspecies(filter).
4. useFilteredEspecies llama a useEspecies con un selector.
5. useEspecies ejecuta getEspecies().
6. getEspecies hace GET a `${EXPO_PUBLIC_API_URL}/especies`.
7. Los datos se adaptan con preparaEspeciesParaHome().
8. EspecieList renderiza cards y navega a /especie/[especieId].
9. La pantalla detalle usa useEspecie(spId), busca la especie en el cache/listado y muestra header + tabla.
10. La pantalla report permite seleccionar especie, ubicación, fecha, hora, descripción e imagen.
11. Al enviar, sendReporte arma FormData y hace POST a `/especies/{sp_id}/reportar`.

Conceptos clave para consultar:
- expo-router: navegación basada en archivos.
- Stack vs Tabs: Stack para pantallas jerárquicas, Tabs para navegación inferior.
- useLocalSearchParams: leer parámetros de ruta.
- React Query useQuery: fetching, cache, loading/error states.
- select en useQuery: transformar datos antes de entregarlos al componente.
- Adapter: función que convierte datos del backend a datos adecuados para UI.
- FormData: envío de formularios con imagen.
- Permisos Expo: cámara, galería y ubicación.


# El panorama de la aplicación

ESPECIES
Backend
   ↓
React Query
   ↓
Adapters
   ↓
UI


AUTENTICACIÓN
Firebase Auth
   ↓
AuthProvider
   ↓
Context
   ↓
UI


LIKES
Firebase Realtime
   ↓
Listener
   ↓
Estado React
   ↓
UI


NAVEGACIÓN
Expo Router
   ↓
Rutas / Parámetros
   ↓
Pantallas


FOTOGRAFÍA
Sistema Operativo
   ↓
Expo
   ↓
Custom Hook
   ↓
Formulario


UBICACIÓN
Sistema Operativo
   ↓
Expo
   ↓
Custom Hook
   ↓
Formulario
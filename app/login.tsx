import {
  View,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router} from "expo-router";
import { TextNunitoSans } from "@/src/components/TextNunitoSans";
import { themeColors } from "@/src/theme/theme";
import { LoginForm } from "@/src/components/auth/LoginForm";

export default function LoginScreen() {

  const handleLoginSuccess = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          bounces={false}
          keyboardShouldPersistTaps="handled"
        >
          <ImageBackground
            source={require("@/assets/images/login_bg.jpg")}
            style={styles.heroSection}
            resizeMode="cover"
          >
            <LinearGradient
              colors={[
                "rgba(19, 20, 13, 0.4)",
                "rgba(19, 20, 13, 0.85)",
              ]}
              style={styles.heroOverlay}
            >
              <View style={styles.heroContent}>
                <MaterialCommunityIcons
                  name="leaf"
                  size={52}
                  color={themeColors.primary}
                />

                <TextNunitoSans style={styles.heroTitle}>
                  Natgeo
                </TextNunitoSans>

                <TextNunitoSans style={styles.heroSubtitle}>
                  Observá.{" "}
                  <TextNunitoSans style={styles.heroHighlight}>
                    Registrá.
                  </TextNunitoSans>{" "}
                  Protegé.
                </TextNunitoSans>
              </View>
            </LinearGradient>
          </ImageBackground>

          <LoginForm
            onLoginSuccess={handleLoginSuccess}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.screenBackground,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },

  // Hero Section
  heroSection: {
    height: 320,
    width: "100%",
  },
  heroOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heroContent: {
    alignItems: "center",
    paddingTop: 40,
  },
  heroTitle: {
    fontSize: 42,
    fontWeight: "800",
    color: "white",
    marginTop: 4,
    letterSpacing: 1,
  },
  heroSubtitle: {
    fontSize: 16,
    color: "rgba(255,255,255,0.8)",
    marginTop: 6,
    fontWeight: "400",
  },
  heroHighlight: {
    color: themeColors.primary,
    fontWeight: "600",
  },

});

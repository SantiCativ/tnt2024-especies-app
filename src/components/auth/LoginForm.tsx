import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

import { AuthDivider } from "@/src/components/auth/AuthDivider";
import { AuthFormInput } from "@/src/components/auth/AuthFormInput";
import { AuthTerms } from "@/src/components/auth/AuthTerms";
import { authStyles } from "@/src/components/auth/authStyles";
import { TextNunitoSans } from "@/src/components/TextNunitoSans";
import { useLoginForm } from "@/src/hooks/useLoginForm";
import { themeColors } from "@/src/theme/theme";

interface LoginFormProps {
  onLoginSuccess: () => void;
}

export function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    togglePasswordVisibility,
    isLoading,
    handleLogin,
  } = useLoginForm();

  const handleSubmit = async () => {
    const success = await handleLogin();

    if (success) {
      onLoginSuccess();
    }
  };

  return (
    <View style={authStyles.card}>
      {/* Encabezado */}
      <View style={authStyles.header}>
        <MaterialCommunityIcons
          name="leaf"
          size={28}
          color={themeColors.primary}
          style={authStyles.headerIcon}
        />

        <TextNunitoSans style={authStyles.title}>
          Iniciar sesión
        </TextNunitoSans>
      </View>

      <TextNunitoSans style={authStyles.subtitle}>
        Accedé para reportar avistajes{"\n"}y ver tu actividad.
      </TextNunitoSans>

      {/* Correo electrónico */}
      <AuthFormInput
        label="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        placeholder="ejemplo@correo.com"
        iconName="mail-outline"
        keyboardType="email-address"
        disabled={isLoading}
      />

      {/* Contraseña */}
      <AuthFormInput
        label="Contraseña"
        value={password}
        onChangeText={setPassword}
        placeholder="••••••••"
        iconName="lock-closed-outline"
        secureTextEntry={!showPassword}
        showPassword={showPassword}
        onTogglePassword={togglePasswordVisibility}
        disabled={isLoading}
        onSubmitEditing={handleSubmit}
      />

      {/* Olvidaste tu contraseña */}
      <TouchableOpacity
        style={styles.forgotPassword}
        disabled={isLoading}
      >
        <TextNunitoSans style={styles.forgotPasswordText}>
          ¿Olvidaste tu contraseña?
        </TextNunitoSans>
      </TouchableOpacity>

      {/* Iniciar sesión */}
      <TouchableOpacity
        style={[
          authStyles.submitButton,
          isLoading && authStyles.submitButtonDisabled,
        ]}
        onPress={handleSubmit}
        disabled={isLoading}
        activeOpacity={0.8}
      >
        {isLoading ? (
          <ActivityIndicator
            size="small"
            color="#13140D"
          />
        ) : (
          <TextNunitoSans style={authStyles.submitButtonText}>
            Iniciar sesión
          </TextNunitoSans>
        )}
      </TouchableOpacity>

      <AuthDivider />

      {/* Crear cuenta */}
      <TouchableOpacity
        style={authStyles.secondaryButton}
        activeOpacity={0.8}
        disabled={isLoading}
        onPress={() => router.replace("/register")}
      >
        <Ionicons
          name="person-add-outline"
          size={20}
          color={themeColors.primary}
          style={authStyles.secondaryButtonIcon}
        />

        <TextNunitoSans style={authStyles.secondaryButtonText}>
          Crear cuenta
        </TextNunitoSans>
      </TouchableOpacity>

      <AuthTerms />
    </View>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 24,
    marginTop: -8,
  },

  forgotPasswordText: {
    fontSize: 13,
    color: themeColors.primary,
    fontWeight: "600",
  },
});
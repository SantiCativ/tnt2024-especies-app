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
import { useRegisterForm } from "@/src/hooks/useRegisterForm";
import { themeColors } from "@/src/theme/theme";

interface RegisterFormProps {
  onRegisterSuccess: () => void;
}

export function RegisterForm({ onRegisterSuccess }: RegisterFormProps) {
  const {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    showPassword,
    togglePasswordVisibility,
    showConfirmPassword,
    toggleConfirmPasswordVisibility,
    isLoading,
    hasMinLength,
    hasUppercase,
    hasNumber,
    handleRegister,
  } = useRegisterForm();

  const handleSubmit = async () => {
    const success = await handleRegister();

    if (success) {
      onRegisterSuccess();
    }
  };

  const handleGoToLogin = () => {
    router.replace("/login");
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
          Crear cuenta
        </TextNunitoSans>
      </View>

      <TextNunitoSans style={authStyles.subtitle}>
        Unite a la comunidad y comenzá{"\n"}a registrar la biodiversidad.
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
      />

      {/* Confirmar contraseña */}
      <AuthFormInput
        label="Confirmar contraseña"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="••••••••"
        iconName="lock-closed-outline"
        secureTextEntry={!showConfirmPassword}
        showPassword={showConfirmPassword}
        onTogglePassword={toggleConfirmPasswordVisibility}
        disabled={isLoading}
        onSubmitEditing={handleSubmit}
      />

      {/* Requisitos de contraseña */}
      <View style={styles.requirementsContainer}>
        <TextNunitoSans style={styles.requirementsTitle}>
          La contraseña debe tener:
        </TextNunitoSans>

        <View style={styles.requirementRow}>
          <Ionicons
            name="checkmark-circle"
            size={18}
            color={hasMinLength ? themeColors.primary : "#555"}
          />
          <TextNunitoSans
            style={[
              styles.requirementText,
              hasMinLength && styles.requirementMet,
            ]}
          >
            Mínimo 6 caracteres
          </TextNunitoSans>
        </View>

        <View style={styles.requirementRow}>
          <Ionicons
            name="checkmark-circle"
            size={18}
            color={hasUppercase ? themeColors.primary : "#555"}
          />
          <TextNunitoSans
            style={[
              styles.requirementText,
              hasUppercase && styles.requirementMet,
            ]}
          >
            Al menos una mayúscula
          </TextNunitoSans>
        </View>

        <View style={styles.requirementRow}>
          <Ionicons
            name="checkmark-circle"
            size={18}
            color={hasNumber ? themeColors.primary : "#555"}
          />
          <TextNunitoSans
            style={[
              styles.requirementText,
              hasNumber && styles.requirementMet,
            ]}
          >
            Al menos un número
          </TextNunitoSans>
        </View>
      </View>

      {/* Crear cuenta */}
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
            Crear cuenta
          </TextNunitoSans>
        )}
      </TouchableOpacity>

      <AuthDivider />

      {/* Ya tengo cuenta */}
      <TouchableOpacity
        style={authStyles.secondaryButton}
        activeOpacity={0.8}
        disabled={isLoading}
        onPress={handleGoToLogin}
      >
        <Ionicons
          name="person-outline"
          size={20}
          color={themeColors.primary}
          style={authStyles.secondaryButtonIcon}
        />

        <TextNunitoSans style={authStyles.secondaryButtonText}>
          Ya tengo cuenta
        </TextNunitoSans>
      </TouchableOpacity>

      <AuthTerms />
    </View>
  );
}

const styles = StyleSheet.create({
  requirementsContainer: {
    marginBottom: 20,
    gap: 6,
  },

  requirementsTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: themeColors.primary,
    marginBottom: 4,
  },

  requirementRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  requirementText: {
    fontSize: 13,
    color: "#777",
    fontWeight: "400",
  },

  requirementMet: {
    color: "rgba(255,255,255,0.8)",
  },
});

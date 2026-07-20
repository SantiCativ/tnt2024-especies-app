import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

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
    <View style={styles.card}>
      {/* Encabezado */}
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="leaf"
          size={28}
          color={themeColors.primary}
          style={styles.headerIcon}
        />

        <TextNunitoSans style={styles.title}>
          Crear cuenta
        </TextNunitoSans>
      </View>

      <TextNunitoSans style={styles.subtitle}>
        Unite a la comunidad y comenzá{"\n"}a registrar la biodiversidad.
      </TextNunitoSans>

      {/* Correo electrónico */}
      <TextNunitoSans style={styles.inputLabel}>
        Correo electrónico
      </TextNunitoSans>

      <View style={styles.inputContainer}>
        <Ionicons
          name="mail-outline"
          size={20}
          color="#888"
          style={styles.inputIcon}
        />

        <TextInput
          style={styles.input}
          placeholder="ejemplo@correo.com"
          placeholderTextColor="#666"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          editable={!isLoading}
        />
      </View>

      {/* Contraseña */}
      <TextNunitoSans style={styles.inputLabel}>
        Contraseña
      </TextNunitoSans>

      <View style={styles.inputContainer}>
        <Ionicons
          name="lock-closed-outline"
          size={20}
          color="#888"
          style={styles.inputIcon}
        />

        <TextInput
          style={styles.input}
          placeholder="••••••••"
          placeholderTextColor="#666"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          autoCorrect={false}
          editable={!isLoading}
        />

        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={styles.eyeButton}
          disabled={isLoading}
        >
          <Ionicons
            name={
              showPassword
                ? "eye-outline"
                : "eye-off-outline"
            }
            size={22}
            color="#888"
          />
        </TouchableOpacity>
      </View>

      {/* Confirmar contraseña */}
      <TextNunitoSans style={styles.inputLabel}>
        Confirmar contraseña
      </TextNunitoSans>

      <View style={styles.inputContainer}>
        <Ionicons
          name="lock-closed-outline"
          size={20}
          color="#888"
          style={styles.inputIcon}
        />

        <TextInput
          style={styles.input}
          placeholder="••••••••"
          placeholderTextColor="#666"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showConfirmPassword}
          autoCapitalize="none"
          autoCorrect={false}
          editable={!isLoading}
          onSubmitEditing={handleSubmit}
        />

        <TouchableOpacity
          onPress={toggleConfirmPasswordVisibility}
          style={styles.eyeButton}
          disabled={isLoading}
        >
          <Ionicons
            name={
              showConfirmPassword
                ? "eye-outline"
                : "eye-off-outline"
            }
            size={22}
            color="#888"
          />
        </TouchableOpacity>
      </View>

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
          styles.submitButton,
          isLoading && styles.submitButtonDisabled,
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
          <TextNunitoSans style={styles.submitButtonText}>
            Crear cuenta
          </TextNunitoSans>
        )}
      </TouchableOpacity>

      {/* Separador */}
      <View style={styles.dividerContainer}>
        <View style={styles.dividerLine} />

        <TextNunitoSans style={styles.dividerText}>
          o
        </TextNunitoSans>

        <View style={styles.dividerLine} />
      </View>

      {/* Ya tengo cuenta */}
      <TouchableOpacity
        style={styles.loginButton}
        activeOpacity={0.8}
        disabled={isLoading}
        onPress={handleGoToLogin}
      >
        <Ionicons
          name="person-outline"
          size={20}
          color={themeColors.primary}
          style={styles.loginButtonIcon}
        />

        <TextNunitoSans style={styles.loginButtonText}>
          Ya tengo cuenta
        </TextNunitoSans>
      </TouchableOpacity>

      {/* Términos y condiciones */}
      <View style={styles.termsContainer}>
        <TextNunitoSans style={styles.termsText}>
          Al continuar, aceptás nuestros
        </TextNunitoSans>

        <View style={styles.termsLinks}>
          <TouchableOpacity>
            <TextNunitoSans style={styles.termsLink}>
              Términos de uso
            </TextNunitoSans>
          </TouchableOpacity>

          <TextNunitoSans style={styles.termsText}>
            {" "}y{" "}
          </TextNunitoSans>

          <TouchableOpacity>
            <TextNunitoSans style={styles.termsLink}>
              Política de privacidad
            </TextNunitoSans>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#1C1D15",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    marginTop: -24,
    paddingHorizontal: 28,
    paddingTop: 32,
    paddingBottom: 30,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  headerIcon: {
    marginRight: 10,
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "white",
  },

  subtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.6)",
    lineHeight: 20,
    marginBottom: 24,
    fontWeight: "400",
  },

  inputLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: themeColors.primary,
    marginBottom: 8,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2A2B22",
    borderRadius: 14,
    marginBottom: 16,
    height: 52,
    paddingHorizontal: 16,
  },

  inputIcon: {
    marginRight: 12,
  },

  input: {
    flex: 1,
    color: "white",
    fontSize: 15,
    fontFamily: "NunitoSans_10pt_Regular",
    height: "100%",
  },

  eyeButton: {
    padding: 4,
  },

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

  submitButton: {
    backgroundColor: themeColors.primary,
    height: 52,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
  },

  submitButtonDisabled: {
    opacity: 0.7,
  },

  submitButtonText: {
    fontSize: 17,
    fontWeight: "700",
    color: "#13140D",
  },

  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },

  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255,255,255,0.12)",
  },

  dividerText: {
    color: "rgba(255,255,255,0.4)",
    fontSize: 14,
    marginHorizontal: 16,
    fontWeight: "400",
  },

  loginButton: {
    flexDirection: "row",
    height: 52,
    borderRadius: 26,
    borderWidth: 1.5,
    borderColor: themeColors.primary,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },

  loginButtonIcon: {
    marginRight: 8,
  },

  loginButtonText: {
    fontSize: 17,
    fontWeight: "700",
    color: themeColors.primary,
  },

  termsContainer: {
    alignItems: "center",
    marginTop: 24,
  },

  termsText: {
    fontSize: 12,
    color: "rgba(255,255,255,0.5)",
    fontWeight: "400",
  },

  termsLinks: {
    flexDirection: "row",
    marginTop: 2,
  },

  termsLink: {
    fontSize: 12,
    color: "rgba(255,255,255,0.7)",
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});

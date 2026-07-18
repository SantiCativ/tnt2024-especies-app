import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

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
    <View style={styles.loginCard}>
      {/* Encabezado */}
      <View style={styles.loginHeader}>
        <MaterialCommunityIcons
          name="leaf"
          size={28}
          color={themeColors.primary}
          style={styles.loginHeaderIcon}
        />

        <TextNunitoSans style={styles.loginTitle}>
          Iniciar sesión
        </TextNunitoSans>
      </View>

      <TextNunitoSans style={styles.loginSubtitle}>
        Accedé para reportar avistajes{"\n"}y ver tu actividad.
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
          onSubmitEditing={handleSubmit}
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
          styles.loginButton,
          isLoading && styles.loginButtonDisabled,
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
          <TextNunitoSans style={styles.loginButtonText}>
            Iniciar sesión
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

      {/* Crear cuenta */}
      <TouchableOpacity
        style={styles.createAccountButton}
        activeOpacity={0.8}
        disabled={isLoading}
      >
        <Ionicons
          name="person-add-outline"
          size={20}
          color={themeColors.primary}
          style={styles.createAccountIcon}
        />

        <TextNunitoSans style={styles.createAccountText}>
          Crear cuenta
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
  loginCard: {
    flex: 1,
    backgroundColor: "#1C1D15",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    marginTop: -24,
    paddingHorizontal: 28,
    paddingTop: 32,
    paddingBottom: 30,
  },

  loginHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  loginHeaderIcon: {
    marginRight: 10,
  },

  loginTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "white",
  },

  loginSubtitle: {
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

  loginButton: {
    backgroundColor: themeColors.primary,
    height: 52,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
  },

  loginButtonDisabled: {
    opacity: 0.7,
  },

  loginButtonText: {
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

  createAccountButton: {
    flexDirection: "row",
    height: 52,
    borderRadius: 26,
    borderWidth: 1.5,
    borderColor: themeColors.primary,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },

  createAccountIcon: {
    marginRight: 8,
  },

  createAccountText: {
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
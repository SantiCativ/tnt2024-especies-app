import { useState } from "react";
import { Alert } from "react-native";
import { useAuth } from "@/src/context/AuthContext";

function getLoginErrorMessage(error: unknown): string {
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error
  ) {
    const code = (error as { code: string }).code;

    switch (code) {
      case "auth/invalid-email":
        return "El correo electrónico no es válido.";

      case "auth/user-not-found":
        return "No se encontró una cuenta con ese correo.";

      case "auth/wrong-password":
        return "La contraseña es incorrecta.";

      case "auth/invalid-credential":
        return "Las credenciales ingresadas no son válidas.";
    }
  }

  return "Ocurrió un error al iniciar sesión.";
}

export function useLoginForm() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (): Promise<boolean> => {
    if (!email.trim() || !password.trim()) {
      Alert.alert(
        "Error",
        "Por favor completá todos los campos."
      );

      return false;
    }

    setIsLoading(true);

    try {
      await login(email.trim(), password);

      return true;
    } catch (error: unknown) {
      Alert.alert(
        "Error",
        getLoginErrorMessage(error)
      );

      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((current) => !current);
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    togglePasswordVisibility,
    isLoading,
    handleLogin,
  };
}
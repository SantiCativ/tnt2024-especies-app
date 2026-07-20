import { useState } from "react";
import { Alert } from "react-native";
import { useAuth } from "@/src/context/AuthContext";

function getRegisterErrorMessage(error: unknown): string {
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error
  ) {
    const code = (error as { code: string }).code;

    switch (code) {
      case "auth/email-already-in-use":
        return "Ya existe una cuenta con ese correo.";

      case "auth/invalid-email":
        return "El correo electrónico no es válido.";

      case "auth/weak-password":
        return "La contraseña es demasiado débil.";
    }
  }

  return "Ocurrió un error al crear la cuenta.";
}

export function useRegisterForm() {
  const { register } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Validaciones en tiempo real para los requisitos de contraseña
  const hasMinLength = password.length >= 6;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  const handleRegister = async (): Promise<boolean> => {
    if (
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      Alert.alert(
        "Error",
        "Por favor completá todos los campos."
      );

      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert(
        "Error",
        "Las contraseñas no coinciden."
      );

      return false;
    }

    if (!hasMinLength || !hasUppercase || !hasNumber) {
      Alert.alert(
        "Error",
        "La contraseña no cumple con los requisitos."
      );

      return false;
    }

    setIsLoading(true);

    try {
      await register(email.trim(), password);

      return true;
    } catch (error: unknown) {
      Alert.alert(
        "Error",
        getRegisterErrorMessage(error)
      );

      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((current) => !current);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((current) => !current);
  };

  return {
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
  };
}

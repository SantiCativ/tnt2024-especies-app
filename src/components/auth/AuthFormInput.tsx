import { FC } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { themeColors } from "@/src/theme/theme";
import { TextNunitoSans } from "@/src/components/TextNunitoSans";

type AuthFormInputProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  iconName: keyof typeof Ionicons.glyphMap;
  disabled?: boolean;
  keyboardType?: "default" | "email-address";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  secureTextEntry?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
  onSubmitEditing?: () => void;
};

export const AuthFormInput: FC<AuthFormInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  iconName,
  disabled = false,
  keyboardType = "default",
  autoCapitalize = "none",
  secureTextEntry = false,
  showPassword,
  onTogglePassword,
  onSubmitEditing,
}) => (
  <>
    <TextNunitoSans style={styles.inputLabel}>
      {label}
    </TextNunitoSans>

    <View style={styles.inputContainer}>
      <Ionicons
        name={iconName}
        size={20}
        color="#888"
        style={styles.inputIcon}
      />

      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#666"
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        autoCorrect={false}
        editable={!disabled}
        secureTextEntry={secureTextEntry}
        onSubmitEditing={onSubmitEditing}
      />

      {onTogglePassword && (
        <TouchableOpacity
          onPress={onTogglePassword}
          style={styles.eyeButton}
          disabled={disabled}
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
      )}
    </View>
  </>
);

const styles = StyleSheet.create({
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
});

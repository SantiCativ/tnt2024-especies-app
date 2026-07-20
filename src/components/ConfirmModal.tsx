import { FC } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { TextNunitoSans } from "./TextNunitoSans";
import { themeColors } from "../theme/theme";

interface ConfirmModalProps {
  visible: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal: FC<ConfirmModalProps> = ({
  visible,
  title,
  message,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <TextNunitoSans style={styles.title}>
            {title}
          </TextNunitoSans>
          <TextNunitoSans style={styles.message}>
            {message}
          </TextNunitoSans>

          <View style={styles.buttonsRow}>
            <Pressable
              style={styles.cancelButton}
              onPress={onCancel}
            >
              <TextNunitoSans style={styles.cancelText}>
                {cancelLabel}
              </TextNunitoSans>
            </Pressable>

            <Pressable
              style={styles.confirmButton}
              onPress={onConfirm}
            >
              <TextNunitoSans style={styles.confirmText}>
                {confirmLabel}
              </TextNunitoSans>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#1E1F17",
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 28,
    width: "85%",
    gap: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: themeColors.textBase,
    textAlign: "center",
  },
  message: {
    fontSize: 14,
    color: "#B0B0A8",
    textAlign: "center",
    lineHeight: 20,
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 8,
  },
  cancelButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#555",
  },
  cancelText: {
    color: themeColors.textBase,
    fontSize: 14,
    fontWeight: "600",
  },
  confirmButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 44,
    borderRadius: 22,
    backgroundColor: "#D94040",
  },
  confirmText: {
    color: themeColors.textBase,
    fontSize: 14,
    fontWeight: "bold",
  },
});

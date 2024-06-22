import { FC, useState } from "react";
import {
  TextStyle,
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import DateTimePickerModal, {
  ReactNativeModalDateTimePickerProps,
} from "react-native-modal-datetime-picker";
import { CustomTextInput } from "./CustomTextInput";

type DateTimeModalInputProps = Omit<
  ReactNativeModalDateTimePickerProps,
  "isVisible" | "onCancel"
> & {
  placeholder?: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
};
export const DateTimeModalInput: FC<DateTimeModalInputProps> = (props) => {
  const {
    style,
    mode,
    date,
    placeholder,
    containerStyle,
    inputStyle,
    onConfirm,
    ...restProps
  } = props;
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (newDate: Date) => {
    onConfirm?.(newDate);
    hideDatePicker();
  };

  const formattedDate =
    mode === "time"
      ? date?.toLocaleTimeString()
      : mode === "datetime"
        ? date?.toLocaleString()
        : date?.toLocaleDateString();

  return (
    <Pressable onPress={showDatePicker} style={containerStyle}>
      <CustomTextInput
        placeholder={placeholder}
        value={formattedDate ?? ""}
        editable={false}
        style={[styles.textInput, inputStyle]}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        date={date}
        mode={mode}
        {...restProps}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  textInput: { color: "black" },
});

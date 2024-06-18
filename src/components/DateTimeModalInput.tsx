import { FC, useState } from "react";
import { TextStyle, Text, Pressable } from "react-native";
import DateTimePickerModal, {
  ReactNativeModalDateTimePickerProps,
} from "react-native-modal-datetime-picker";

type DateTimeModalInputProps = Omit<
  ReactNativeModalDateTimePickerProps,
  "isVisible" | "onCancel"
> & {
  placeholder?: string;
  placeholderStyle?: TextStyle;
};
export const DateTimeModalInput: FC<DateTimeModalInputProps> = (props) => {
  const {
    style,
    mode,
    date,
    placeholder,
    placeholderStyle,
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
    <Pressable onPress={showDatePicker} style={style}>
      {placeholder && <Text style={placeholderStyle}>{placeholder}</Text>}
      <Text style={{ color: "black" }}>{formattedDate ?? ""}</Text>
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

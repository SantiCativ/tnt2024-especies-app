import {
  AndroidNativeProps,
  DateTimePickerAndroid,
  WindowsNativeProps,
} from "@react-native-community/datetimepicker";
import { FC } from "react";
import { Pressable, TextStyle, Text } from "react-native";

type DateTimeInputProps = (AndroidNativeProps | WindowsNativeProps) & {
  placeholder?: string;
  placeholderStyle?: TextStyle;
};
export const DateTimeInput: FC<DateTimeInputProps> = (props) => {
  const { style, placeholder, placeholderStyle, value, ...restProps } = props;
  const openDatePicker = () => {
    DateTimePickerAndroid.open({
      ...(restProps as AndroidNativeProps),
      value: value,
    });
  };

  return (
    <Pressable onPress={openDatePicker} style={style}>
      {placeholder && (
        <Text style={placeholderStyle}>ANDROID {placeholder}</Text>
      )}
      <Text>{value?.toLocaleDateString() ?? ""}</Text>
    </Pressable>
  );
};

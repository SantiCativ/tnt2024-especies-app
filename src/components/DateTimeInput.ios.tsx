import DateTimePicker, {
  IOSNativeProps,
  WindowsNativeProps,
} from "@react-native-community/datetimepicker";
import { FC } from "react";
import { TextStyle, View, Text } from "react-native";

type DateTimeInputProps = (IOSNativeProps | WindowsNativeProps) & {
  placeholder?: string;
  placeholderStyle?: TextStyle;
};
export const DateTimeInput: FC<DateTimeInputProps> = (props) => {
  const { style, placeholder, placeholderStyle, ...restProps } = props;

  return (
    <View style={style}>
      {placeholder && <Text style={placeholderStyle}>IOS {placeholder}</Text>}
      <DateTimePicker {...(restProps as IOSNativeProps)} />
    </View>
  );
};

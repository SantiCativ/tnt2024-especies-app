import { FC } from "react";
import { Platform, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CustomButton } from "@/src/components/CustomButton";
import { CustomTextInput } from "@/src/components/CustomTextInput";
import { DateTimeModalInput } from "@/src/components/DateTimeModalInput";
import { EspecieSelector } from "@/src/components/EspecieSelector";
import { TextNunitoSans } from "@/src/components/TextNunitoSans";
import { ReportDescription } from "@/src/components/report/ReportDescription";
import { ReportImagePicker } from "@/src/components/report/ReportImagePicker";
import { ReportLocation } from "@/src/components/report/ReportLocation";
import { useReportForm } from "@/src/hooks/useReportForm";
import { themeStyles } from "@/src/theme/theme";

type ReportFormProps = {
  initialSpId?: string | null;
  onSubmitError?: (message: string) => void;
  onSubmitSuccess?: () => void;
};

export const ReportForm: FC<ReportFormProps> = ({
  initialSpId,
  onSubmitError,
  onSubmitSuccess,
}) => {
  const form = useReportForm({
    initialSpId,
    onSubmitError,
    onSubmitSuccess,
  });
  const insets = useSafeAreaInsets();
  const numberInputType: "numeric" | "numbers-and-punctuation" =
    Platform.select({ ios: "numbers-and-punctuation", default: "numeric" });

  return (
    <ScrollView
      style={themeStyles.screen}
      contentContainerStyle={[
        styles.container,
        { paddingTop: 10 + insets.top },
      ]}
    >
      <TextNunitoSans style={styles.title}>Reportar avistaje</TextNunitoSans>

      <EspecieSelector
        spId={form.spId}
        setSpId={form.setSpId}
        inputStyle={form.errors.includes("spId") ? styles.error : null}
      />

      <ReportLocation
        onLocationSelected={({ latitud, longitud }) => {
          form.setLocation(latitud, longitud);
        }}
      />

      <View style={styles.rowContainer}>
        <CustomTextInput
          placeholder="Latitud"
          onChangeText={form.setLatitud}
          value={form.latitud}
          style={[
            styles.flex1,
            form.errors.includes("latitud") ? styles.error : null,
          ]}
          keyboardType={numberInputType}
          returnKeyType="done"
        />

        <CustomTextInput
          placeholder="Longitud"
          onChangeText={form.setLongitud}
          value={form.longitud}
          style={[
            styles.flex1,
            form.errors.includes("longitud") ? styles.error : null,
          ]}
          keyboardType={numberInputType}
          returnKeyType="done"
        />
      </View>

      <View style={styles.rowContainer}>
        <DateTimeModalInput
          placeholder="Fecha"
          display="inline"
          mode="date"
          date={form.fecha}
          onConfirm={form.setFecha}
          containerStyle={styles.flex1}
          inputStyle={form.errors.includes("fecha") ? styles.error : null}
        />

        <DateTimeModalInput
          placeholder="Hora"
          display="inline"
          mode="time"
          date={form.hora}
          onConfirm={form.setHora}
          containerStyle={styles.flex1}
          inputStyle={form.errors.includes("hora") ? styles.error : null}
        />
      </View>

      <ReportDescription
        onChangeText={form.setDescripcion}
        value={form.descripcion}
        inputStyle={form.errors.includes("descripcion") ? styles.error : null}
      />

      <ReportImagePicker
        image={form.imagen}
        onError={form.addError}
        onImageChange={form.setImagen}
      />

      <Pressable onPress={form.submit}>
        <CustomButton label="Reportar avistje" />
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    paddingBottom: 10,
    gap: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "semibold",
  },
  flex1: { flex: 1 },
  rowContainer: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
  },
  error: {
    borderColor: "rgb(239 68 68)",
    borderWidth: 3,
  },
});

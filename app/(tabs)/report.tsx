import { ReportForm } from "@/src/components/report/ReportForm";
import { useLocalSearchParams } from "expo-router";

export default function ReportScreen() {
  const params = useLocalSearchParams<{ reportSpId?: string }>();

  return (
    <ReportForm
      initialSpId={params.reportSpId ?? null}
      onSubmitSuccess={() => {
        console.log("Reporte enviado con exito");
      }}
      onSubmitError={(message) => {
        console.error("Error al enviar el reporte", message);
      }}
    />
  );
}

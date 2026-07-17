import { useEffect, useState } from "react";
import { TReporte, sendReporte } from "@/src/services/especies.service";

type UseReportFormParams = {
  initialSpId?: string | null;
  onSubmitError?: (message: string) => void;
  onSubmitSuccess?: () => void;
};

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return "Error desconocido";
}

export function useReportForm({
  initialSpId = null,
  onSubmitError,
  onSubmitSuccess,
}: UseReportFormParams = {}) {
  const [spId, setSpId] = useState<string | null>(initialSpId);
  const [latitud, setLatitud] = useState("");
  const [longitud, setLongitud] = useState("");
  const [fecha, setFecha] = useState<Date>(new Date());
  const [hora, setHora] = useState<Date>(new Date());
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState<string | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (initialSpId) {
      setSpId(initialSpId);
    }
  }, [initialSpId]);

  const addError = (error: string) => {
    setErrors((prevErrors) => [...prevErrors, error]);
  };

  const setLocation = (newLatitud: string, newLongitud: string) => {
    setLatitud(newLatitud);
    setLongitud(newLongitud);
  };

  const resetForm = () => {
    setSpId(null);
    setLatitud("");
    setLongitud("");
    setFecha(new Date());
    setHora(new Date());
    setDescripcion("");
    setImagen(null);
  };

  const validate = () => {
    const errorsArr: string[] = [];
    const spIdNumber = spId === null ? NaN : Number(spId);

    if (!Number.isInteger(spIdNumber) || spIdNumber <= 0) {
      errorsArr.push("spId");
    }
    if (latitud === "") {
      errorsArr.push("latitud");
    }
    if (longitud === "") {
      errorsArr.push("longitud");
    }
    if (descripcion === "") {
      errorsArr.push("descripcion");
    }

    return errorsArr;
  };

  const buildReporte = (): TReporte | null => {
    const spIdNumber = spId === null ? NaN : Number(spId);

    if (!Number.isInteger(spIdNumber) || spIdNumber <= 0) {
      return null;
    }

    return {
      sp_id: spIdNumber,
      fecha,
      hora,
      latitud: parseFloat(latitud),
      longitud: parseFloat(longitud),
      descripcion,
      imagen,
    };
  };

  const submit = async () => {
    const errorsArr = validate();
    setErrors(errorsArr);

    if (errorsArr.length > 0) {
      return;
    }

    const reporte = buildReporte();

    if (reporte === null) {
      return;
    }

    try {
      await sendReporte(reporte);
      onSubmitSuccess?.();
    } catch (error) {
      onSubmitError?.(getErrorMessage(error));
    }

    resetForm();
  };

  return {
    addError,
    descripcion,
    errors,
    fecha,
    hora,
    imagen,
    latitud,
    longitud,
    setDescripcion,
    setFecha,
    setHora,
    setImagen,
    setLatitud,
    setLocation,
    setLongitud,
    setSpId,
    spId,
    submit,
  };
}

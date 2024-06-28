import axios from "axios";

export async function getEspecies() {
  const response = await axios.get<TEspecie[]>(
    // toma el valor de .env.local
    // resulta en http://localhost:3000/especies
     `${process.env.EXPO_PUBLIC_API_URL}/especies`
  );
  return response.data;
}

export async function sendReporte(reporte: TReporte) {
  const formData = new FormData();
  // "2024-06-12T22:27:00.000Z".split("T") -> ["2024-06-12", 22:27:00.000Z]
  const fechaFormateada = reporte.fecha.toISOString().split("T")[0];

  const horaFormateada = `${reporte.hora.getHours()}:${reporte.hora.getMinutes()}`;

  formData.append("sp_id", reporte.sp_id.toString());
  formData.append("fecha", fechaFormateada);
  formData.append("hora", horaFormateada);
  formData.append("latitud", reporte.latitud.toString());
  formData.append("longitud", reporte.longitud.toString());
  formData.append("descripcion", reporte.descripcion);
  if (reporte.imagen) {
    formData.append("imagen", reporte.imagen);
  }

  console.log(formData)

  // SI NUESTRO ENDPOINT ESPERA UN JSON
  // fetch(`${process.env.EXPO_PUBLIC_API_URL}/especies/${reporte.sp_id}/reportar`, {
  //   method: "POST",
  //   body: JSON.stringify(reporte),
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });

  // await fetch(
  //   `${process.env.EXPO_PUBLIC_API_URL}/especies/${reporte.sp_id}/reportar`,
  //   {
  //     method: "POST",
  //     body: formData,
  //   }
  // );

  return axios.post(
    `${process.env.EXPO_PUBLIC_API_URL}/especies/${reporte.sp_id}/reportar`,
    formData
  );
}

export interface TReporte {
  sp_id: number;
  fecha: Date;
  hora: Date;
  latitud: number;
  longitud: number;
  descripcion: string;
  imagen: string | null;
}

export interface TEspecie {
  sp_id: number;
  reino: TReino;
  phydiv: string | null;
  clase: string;
  orden: string;
  familia: string;
  nombre_cientifico: string;
  origen: string;
  imagen: null | string;
}

export const TReinoEnum = {
  ANIMALIA: "ANIMALIA",
  PLANTAE: "PLANTAE",
  FUNGI: "FUNGI",
} as const;
export type TReino = (typeof TReinoEnum)[keyof typeof TReinoEnum];

// ===========
// SIN AXIOS
// ===========
// export async function getEspecies() {
//   try {
//     const response = await fetch("http://localhost:3000/especies");
//     if (!response.ok) {
//       let error = new CustomError("HTTP error, status = " + response.status);
//       error.response = response;
//       throw error;
//     }
//     const data: TEspecie[] = await response.json();
//     return data;
//   } catch (error) {
//     if (error instanceof CustomError) {
//       console.error("ERROR", error?.response);
//     }
//     throw error;
//   }
// }

// class CustomError extends Error {
//   public response: Response | undefined;
// }

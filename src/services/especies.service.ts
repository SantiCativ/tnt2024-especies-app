export async function getEspecies() {
  const response = await fetch("http://192.168.1.19:3000/especies");
  // para el celu: http://192.168.1.19:3000/especies
  if (!response.ok) {
    throw new Error("HTTP error, status = " + response.status);
  }
  const data: TEspecie[] = await response.json();
  return data;
}

export interface TEspecie {
  sp_id: number;
  reino: TReino;
  phydiv: null;
  clase: string;
  orden: string;
  familia: string;
  nombre_cientifico: string;
  origen: string;
  imagen: null | string;
  likes: number;
}

export const TReinoEnum = {
  ANIMALIA: "ANIMALIA",
  PLANTAE: "PLANTAE",
  FUNGI: "FUNGI",
} as const;
export type TReino = (typeof TReinoEnum)[keyof typeof TReinoEnum];

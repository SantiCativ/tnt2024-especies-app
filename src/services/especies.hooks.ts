import { useQuery } from "@tanstack/react-query";
import {
  EspecieHome,
  preparaEspeciesParaHome,
} from "@/src/adapters/homeAdapters";
import { TEspecie, TReino, getEspecies } from "./especies.service";

export function useEspecies<TData = TEspecie[]>(
  customSelect?: (data: TEspecie[]) => TData
) {
  const result = useQuery({
    queryKey: ["especies"],
    queryFn: () => {
      return getEspecies();
    },
    // data inicial antes del primer fetch
    initialData: [],
    // hacemos esto para que el array vacio no se considere "stale"
    // AHORA - 6 segundos para que se considere "stale"
    initialDataUpdatedAt: new Date(Date.now() - 1000 * 60).getTime(),
    staleTime: 1000 * 5,
    // select espera una funcion que reciba data (el resultado de queryFn)
    // y retorna la data transformada
    select: customSelect,
  });
  return result;
}

export function useEspeciesHome() {
  const selectorAdapter = (data: TEspecie[]) => {
    return preparaEspeciesParaHome(data);
  };
  return useEspecies(selectorAdapter);
}

export function useEspecie(spId: number) {
  const selectorAdapter = (data: TEspecie[]): TEspecie | null => {
    const especie = data.find((especie) => {
      return especie.sp_id === spId;
    });
    return especie ?? null;
  };
  return useEspecies(selectorAdapter);
}

export function useFilteredEspecies(reino: null | TReino) {
  const selectorAdapter = (data: TEspecie[]): EspecieHome[] => {
    if (reino === null) {
      return preparaEspeciesParaHome(data);
    } else {
      const especiesFiltered = data.filter(
        (especie) => especie.reino === reino
      );
      return preparaEspeciesParaHome(especiesFiltered);
    }
  };
  return useEspecies(selectorAdapter);
}

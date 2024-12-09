import { rawAxios } from "../utils/axios";

export function useAxios() {
  return {
    axios: rawAxios,
  };
}

import { useQuery } from "@tanstack/react-query";
import { useAxiosPrivate } from "./useAxiosPrivate";

export function useGetBot() {
  const { axiosPrivate } = useAxiosPrivate();

  const fetchBot = async () => {
    const {
      data: { data },
    } = await axiosPrivate.get(
      `api/avtars-info/`
    );

    return data;
  };

  return useQuery({
    queryKey: ["bot"],
    queryFn: fetchBot,
  });
}

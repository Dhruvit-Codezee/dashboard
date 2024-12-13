import { useAxiosPrivate } from "@/app/hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";

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
    queryKey: ["bot", 'list'],
    queryFn: fetchBot,
  });
}

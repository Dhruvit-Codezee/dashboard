import { useAxiosPrivate } from "@/app/hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";

export const useGetBotListData = ({ botEditId }) => {
  const { axiosPrivate } = useAxiosPrivate();

  const fetchBotListData = async () => {
    const {
      data: { data },
    } = await axiosPrivate.get(
      `api/avtar-profile/${botEditId}/`
    );

    return data;
  };

  return useQuery({
    queryKey: ["bot", "get", botEditId],
    queryFn: fetchBotListData,
    enabled: !!botEditId,
  });
};


import { useAxiosPrivate } from "@/app/hooks/useAxiosPrivate";
import { useQuery } from "@tanstack/react-query";

export const useGetBotListData = ({ botId }) => {
  const { axiosPrivate } = useAxiosPrivate();
  const fetchBotListData = async () => {
    const {
      data: { data },
    } = await axiosPrivate.get(
      `api/avtar-profile/${botId}/`
    );

    return data;
  };

  return useQuery({
    queryKey: ["bot", "get"],
    queryFn: fetchBotListData,
    enabled: !!botId,
  });
};


"use client";

import { useAxiosPrivate } from "@/app/hooks/useAxiosPrivate";
import { useMutation } from "@tanstack/react-query";

export function useDeleteBotListData({
  botId,
  options = {},
}) {
  const { axiosPrivate } = useAxiosPrivate();

  return useMutation({
    mutationKey: ["bot", "delete", botId],
    mutationFn: async () => {
      const { data } = await axiosPrivate.delete(
        `api/delete-bot-profile/${botId}`
      );

      return data;
    },
    ...options,
  });
}

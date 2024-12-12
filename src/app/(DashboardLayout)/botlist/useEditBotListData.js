"use client";

import { useAxiosPrivate } from "@/app/hooks/useAxiosPrivate";
import { useMutation } from "@tanstack/react-query";

export function useEditBotListData({
  botEditId,
  options = {},
}) {
  const { axiosPrivate } = useAxiosPrivate();

  return useMutation({
    mutationKey: ['bot', "edit", botEditId,],
    mutationFn: async (formValues) => {
      const { data } = await axiosPrivate.put(
        `api/avtar-profile/${botEditId}/`,
        formValues,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return data;
    },
    ...options,
  });
}

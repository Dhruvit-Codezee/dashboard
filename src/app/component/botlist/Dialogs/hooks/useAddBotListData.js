"use client";

import { useAxiosPrivate } from "@/app/hooks/useAxiosPrivate";
import { useMutation } from "@tanstack/react-query";

export function useAddBotListData({ options = {} }) {
  const { axiosPrivate } = useAxiosPrivate();

  return useMutation({
    mutationKey: ["bot", "add_data"],
    mutationFn: async (formData) => {
      const { data } =
        await axiosPrivate.post(
          "api/avtars-info/",
          formData,
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

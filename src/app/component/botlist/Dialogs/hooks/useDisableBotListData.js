"use client";

import { useAxiosPrivate } from "@/app/hooks/useAxiosPrivate";
import { useMutation } from "@tanstack/react-query";

export function useAddBotListData({ options = {} }) {
    const { axiosPrivate } = useAxiosPrivate();

    return useMutation({
        mutationKey: ["bot", "disable"],
        mutationFn: async (formData) => {
            const { data } =
                await axiosPrivate.post(
                    `api/disable-bot-profile/${botId}`,
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

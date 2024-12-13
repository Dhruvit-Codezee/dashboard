"use client";

import { useAxiosPrivate } from "@/app/hooks/useAxiosPrivate";
import { useMutation } from "@tanstack/react-query";

export function useAddBotImages({ options = {} }) {
    const { axiosPrivate } = useAxiosPrivate();

    return useMutation({
        mutationKey: ["bot", "add_images"],
        mutationFn: async (formData) => {
            const { data } =
                await axiosPrivate.post(
                    "api/add-avtar-images/",
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

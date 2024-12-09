"use client";

import { PageLoader } from "@/app/common/PageLoader";
import { useSession } from "next-auth/react";

export const SessionLoader = ({ children }) => {
  const { status } = useSession();

  if (status === "loading") {
    return <PageLoader />;
  }

  return children;
};

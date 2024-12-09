"use client";

import { PageLoader } from "@/app/common/PageLoader";
import { Box } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function PublicPageLayout({ children }) {
  const { status } = useSession();
  

  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "authenticated") {
    return <PageLoader />;
  }

  return (
<div> {children}</div>
     
  );
}

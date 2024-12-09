"use client";

import { usePathname } from "next/navigation";
import axios from "axios";
import { baselightTheme } from "@/utils/theme/DefaultColors";
import { ThemeProvider } from "@mui/material/styles";
import { SessionLoader } from "@/provider/SessionLoader";
import { AuthSessionProvider } from "@/provider/AuthSessionProvider";
import { PublicPageLayout } from "@/layouts/PublicPageLayout";
import { PrivatePageLayout } from "@/layouts/PrivatePageLayout";
import ToastElement from "./common/ToastElement";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CssBaseline } from "@mui/material";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      gcTime: 0,
    },
  },
});
export default function RootLayout({ children }) {
  const currentPathname = usePathname();

  const authPage = currentPathname.startsWith("/auth");

  // axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_SERVER;

  return (
    <html lang="en">
      <body className="antialiased">
        <AuthSessionProvider>
          <SessionLoader>
            <QueryClientProvider client={queryClient}>

              <ThemeProvider theme={baselightTheme}>
                <CssBaseline />

                {authPage ? (
                  <PublicPageLayout>{children}</PublicPageLayout>
                ) : (
                  <PrivatePageLayout>{children}</PrivatePageLayout>
                )}
                <ToastElement />

              </ThemeProvider>
            </QueryClientProvider>

          </SessionLoader>
        </AuthSessionProvider>
      </body>
    </html>
  );
}

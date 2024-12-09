import CredentialsProvider from "next-auth/providers/credentials";


import { rawAxios } from "./axios";
import { HttpStatus } from "@/constants/httpStatus";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (credentials) {
          try {
            const { data } = await rawAxios.post("/api/super-admin-login/", {
              email: credentials.email,
              password: credentials.password,
            });
            console.log('Sending request payload:', {
              email: credentials.email,
              password: credentials.password,
            });

            console.log('data', data)

            if (data.status_code === HttpStatus.Ok) {
              return {
                ...data,
              };
            }
          } catch (e) {
            // eslint-disable-next-line no-console
            console.log("error in signin -> ", e);

            return null;
          }
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/sign-in",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }

      return token;
    },

    async session({ session, token }) {
      session.user = {
        ...session.user,
        ...token.user,
      };

      return session;
    },
  },
};

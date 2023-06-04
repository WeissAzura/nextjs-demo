import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if ((credentials?.username == "") | (credentials?.password == "")) {
          return null;
        } else {
          const data = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/local`,
            {
              method: "POST",
              body: JSON.stringify({
                identifier: credentials?.username,
                password: credentials?.password,
              }),
              headers: { "Content-Type": "application/json" },
            }
          )
            .then((res) => {
              return res.json();
            })
            .catch((err) => {
              return null;
            });

          if (data?.data === null) {
            throw new Error(data?.error?.message);
          }
          return data;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account?.provider !== "credentials") {
        if (account) {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/${account.provider}/callback?access_token=${account.access_token}`
          );
          const data = await res.json();
          const { jwt, user } = data;
          token.accessToken = jwt;
          token.userId = user.id;
        }
      } else {
        token.accessToken = user.jwt;
        token.id = user.user.id;
        token.username = user.user.username;
      }
      return token;
    },

    async session({ session, token, user }) {
      session.id = token.id;
      session.jwt = token.jwt;
      session.user.username = token.username;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};

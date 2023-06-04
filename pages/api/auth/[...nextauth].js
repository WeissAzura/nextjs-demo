import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";
export default async function auth(req, res) {
  return await NextAuth(req, res, {
    ...authOptions,
    session: {
      jwt: true,
    },
  });
}

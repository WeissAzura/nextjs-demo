import LoginForm from "@/app/login/form";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
export const metadata = {
  title: "Login",
  description: "Login",
};
export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  } else {
    return <LoginForm />;
  }
}

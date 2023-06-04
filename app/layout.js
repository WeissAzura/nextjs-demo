import Header from "./components/header";
import "@/styles/globals.css";
import localFont from "next/font/local";
export const avenir = localFont({
  src: "../public/fonts/AvenirNext.ttf",
  weight: "400 900",
  display: "swap",
  variable: "--font-avenir",
});
import { NextAuthProvider } from "@/app/provider";
import Footer from "@/app/components/footer";
import Providers from "@/app/query_provider";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={avenir.variable}>
      <body>
        <NextAuthProvider>
          <Header />
          <Providers>{children}</Providers>
          <Footer />
        </NextAuthProvider>
      </body>
    </html>
  );
}

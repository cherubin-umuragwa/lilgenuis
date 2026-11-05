import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-heading",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "LilGenius | Learn. Play. Discover. Create.",
  description:
    "LilGenius is an interactive educational web application for children aged 6–12. Learn mathematics, science, geography, history, languages and more through play.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fredoka.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

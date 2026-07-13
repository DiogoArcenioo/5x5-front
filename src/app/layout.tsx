import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "5x5.gg",
  description: "Jogo de navegador sobre o cenário competitivo de Counter-Strike.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

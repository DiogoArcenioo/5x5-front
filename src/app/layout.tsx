import type { Metadata } from "next";
import "./globals.css";
import {
  siteAlternateNames,
  siteDescription,
  siteName,
  siteUrl,
} from "./site-config";

const googleVerification = process.env.GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "5x5: jogo de CS grátis para montar seu time e vencer o Major",
    template: "%s | 5x5",
  },
  description: siteDescription,
  applicationName: siteName,
  category: "games",
  authors: [{ name: "Equipe 5x5", url: siteUrl }],
  creator: "Equipe 5x5",
  publisher: "5x5",
  other: {
    "google-adsense-account": "ca-pub-2427981300799321",
  },
  alternates: { canonical: "/inicio" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/inicio",
    siteName,
    title: "5x5: jogo de CS grátis para montar seu time e vencer o Major",
    description: siteDescription,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "5x5, jogo gratuito de draft e simulação de Major de Counter-Strike",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "5x5: jogo de CS grátis para montar seu time e vencer o Major",
    description: siteDescription,
    images: ["/opengraph-image"],
  },
  ...(googleVerification
    ? { verification: { google: googleVerification } }
    : {}),
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: siteName,
      alternateName: siteAlternateNames,
      url: siteUrl,
      description: siteDescription,
      inLanguage: "pt-BR",
    },
    {
      "@type": ["VideoGame", "WebApplication"],
      "@id": `${siteUrl}/#game`,
      name: siteName,
      alternateName: siteAlternateNames,
      url: `${siteUrl}/inicio`,
      description: siteDescription,
      applicationCategory: "GameApplication",
      applicationSubCategory: "Jogo de estratégia e simulação de Counter-Strike",
      gamePlatform: "Navegador web",
      operatingSystem: "Qualquer sistema com navegador moderno",
      browserRequirements: "Requer JavaScript e um navegador moderno",
      inLanguage: "pt-BR",
      isAccessibleForFree: true,
      image: `${siteUrl}/opengraph-image`,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "BRL",
        availability: "https://schema.org/InStock",
      },
      publisher: { "@id": `${siteUrl}/#website` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}

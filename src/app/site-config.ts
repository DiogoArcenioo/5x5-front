const fallbackSiteUrl =
  "https://cs5x5.com";

export const siteUrl = (process.env.SITE_URL || fallbackSiteUrl).replace(
  /\/$/,
  "",
);

export const siteName = "5x5";
export const siteAlternateNames = ["CS5x5", "CS 5x5", "5x5 CS"];
export const siteDescription =
  "Jogo de CS gratuito no navegador: monte uma lineup com jogadores históricos de Counter-Strike, faça o draft e dispute um Major completo.";

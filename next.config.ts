import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [
      { source: "/", destination: "/inicio", permanent: true },
      { source: "/5x5.dc.html", destination: "/inicio", permanent: true },
      { source: "/admin.html", destination: "/admin", permanent: true },
    ];
  },
  async headers() {
    const noIndexHeaders = [
      {
        key: "X-Robots-Tag",
        value: "noindex, follow",
      },
    ];

    const securityHeaders = [
      { key: "Content-Security-Policy", value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://unpkg.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'; upgrade-insecure-requests" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
      { key: "Strict-Transport-Security", value: "max-age=31536000" },
    ];

    return [
      { source: "/:path*", headers: securityHeaders },
      { source: "/admin/:path*", headers: noIndexHeaders },
      { source: "/entrar", headers: noIndexHeaders },
      { source: "/cadastro", headers: noIndexHeaders },
      { source: "/perfil", headers: noIndexHeaders },
      { source: "/jogar/monte-seu-time", headers: noIndexHeaders },
      { source: "/jogar/monte-seu-time/:path*", headers: noIndexHeaders },
      { source: "/jogadores/:slug", headers: noIndexHeaders },
      { source: "/times/:slug", headers: noIndexHeaders },
      { source: "/temporadas/:code", headers: noIndexHeaders },
      { source: "/api/:path*", headers: noIndexHeaders },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/inicio", destination: "/5x5.dc.html" },
        { source: "/jogar", destination: "/5x5.dc.html" },
        { source: "/jogar/:path*", destination: "/5x5.dc.html" },
        { source: "/jogadores", destination: "/5x5.dc.html" },
        { source: "/jogadores/:slug", destination: "/5x5.dc.html" },
        { source: "/times", destination: "/5x5.dc.html" },
        { source: "/times/:slug", destination: "/5x5.dc.html" },
        { source: "/ranking", destination: "/5x5.dc.html" },
        { source: "/regras", destination: "/5x5.dc.html" },
        { source: "/sobre", destination: "/5x5.dc.html" },
        { source: "/temporadas", destination: "/5x5.dc.html" },
        { source: "/temporadas/:code", destination: "/5x5.dc.html" },
        { source: "/entrar", destination: "/5x5.dc.html" },
        { source: "/cadastro", destination: "/5x5.dc.html" },
        { source: "/perfil", destination: "/5x5.dc.html" },
        { source: "/admin", destination: "/admin.html" },
      ],
    };
  },
};

export default nextConfig;

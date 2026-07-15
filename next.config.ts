import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [
      { source: "/5x5.dc.html", destination: "/inicio", permanent: true },
      { source: "/admin.html", destination: "/admin", permanent: true },
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

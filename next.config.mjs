/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // Il template accetta immagini da qualsiasi CDN HTTPS: per un cliente in produzione
    // conviene restringere l'elenco agli host effettivamente usati.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;

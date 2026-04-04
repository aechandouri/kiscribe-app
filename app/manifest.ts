import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kiscribe",
    short_name: "Kiscribe",
    description: "Notes SOAPIE et codes AMK en 90 secondes de dictée",
    start_url: "/dashboard",
    display: "standalone",
    background_color: "#FAFAF8",
    theme_color: "#5C7A5F",
    orientation: "portrait",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}

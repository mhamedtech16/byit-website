import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    loader: "custom", // or 'imgix', 'cloudinary' etc.
    loaderFile: "./imageLoader.js", // Create this file
    unoptimized: true, // disables next/image optimization
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://byit-real-estate.k.frappe.cloud/api/:path*",
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);

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
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);

import { Metadata } from "next";

const title = "DYAD";
const description =
  "A fundamentally new DeFi primitive for managing volatility.";

export const metadata: Metadata = {
  title,
  description,
  themeColor: "#ffffff",
  icons: [
    {
      url: "apple-touch-icon.png",
      sizes: "180x180",
      rel: "apple-touch-icon",
    },
    {
      url: "favicon-32x32.png",
      type: "image/png",
      sizes: "32x32",
      rel: "icon",
    },
    {
      url: "favicon-64x64.png",
      type: "image/png",
      sizes: "64x64",
      rel: "icon",
    },
    {
      url: "safari-pinned-tab.svg",
      rel: "mask-icon",
    },
  ],
  manifest: "manifest.json",
  openGraph: {
    title,
    description,
    siteName: title,
    images: ["preview.png"],
  },
  twitter: {
    title,
    description,
    images: ["preview.png"],
  },
};

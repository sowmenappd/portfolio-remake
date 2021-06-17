import Head from "next/head";
import React from "react";

const SEO = ({
  title,
  description,
  type = "website",
  image = "/images/wide-logo.png",
}) => {
  const siteURL =
    process.env.NEXT_PUBLIC_VERCEL_URL || "https://sowmenappd.github.io";

  return (
    <Head>
      <title>{title}</title>
      <meta name="twitter:creator" content="@sowmenr"></meta>
      <meta name="twitter:card" content="summary_large_image"></meta>
      <meta property="og:type" content={type}></meta>

      <meta property="og:title" content={title}></meta>
      <meta name="twitter:title" content={title}></meta>

      <meta name="description" content={description}></meta>
      <meta name="twitter:description" content={description}></meta>

      <meta property="og:image" content={`https://${siteURL}${image}`}></meta>
      <meta property="og:locale" content="en_US"></meta>
      <meta name="twitter:image" content={`https://${siteURL}${image}`}></meta>
      <link href="/common.css" rel="stylesheet" />

      <link
        rel="apple-touch-icon"
        sizes="192x192"
        href="/images/icon-192x192.png"
      ></link>
      <link
        rel="apple-touch-icon"
        sizes="256x256"
        href="/images/icon-256x256.png"
      ></link>
      <link
        rel="apple-touch-icon"
        sizes="384x384"
        href="/images/icon-384x384.png"
      ></link>
      <link
        rel="apple-touch-icon"
        sizes="512x512"
        href="/images/icon-512x512.png"
      ></link>
      <link rel="shortcut icon" href="/favicon.ico" />
    </Head>
  );
};

export default SEO;

import React from "react";
import Head from "next/head";

import Header from "../components/Header";
import Home from "../components/Home";
import Intro from "../components/Intro";
import Layout from "../components/Layout";

const Index = () => (
  <Layout>
    <Header />
    <Intro />
    <Home />
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org/",
          "@type": "Person",
          name: "Sowmen Rahman",
          url: process.env.NEXT_PUBLIC_VERCEL_URL,
          image: process.env.NEXT_PUBLIC_VERCEL_URL + "/images/dp.png",
          sameAs: [
            "https://www.facebook.com/sowmen.rahman.01",
            "https://twitter.com/SowmenR",
            "https://www.instagram.com/art1san__",
            "https://www.youtube.com/channel/UC5vjE1_tiI-sOhcZTT0AI8A",
            "https://www.linkedin.com/in/sowmen-rahman-01/",
            "https://github.com/sowmenappd",
            "https://sowmenrahman.tech",
          ],
          jobTitle: "Software Engineer",
        }),
      }}
    />
  </Layout>
);

export default Index;

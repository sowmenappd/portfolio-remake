import React from "react";
import Head from "next/head";

import Header from "../components/Header";
import Home from "../components/Home";
import Intro from "../components/Intro";
import Layout from "../components/Layout";

const Index = () => (
  <Layout>
    <Head>
      <script type="application/ld+json">
        {`{
            "@context": "https://schema.org/",
            "@type": "Person",
            name: "Sowmen Rahman",
            url: "https://sowmenrahman.vercel.app",
            image: "https://sowmenrahman.vercel.app/images/dp.png",
            sameAs: [
              "https://www.facebook.com/sowmen.rahman.01",
              "https://twitter.com/SowmenR",
              "https://www.instagram.com/art1san__",
              "https://www.youtube.com/channel/UC5vjE1_tiI-sOhcZTT0AI8A",
              "https://www.linkedin.com/in/sowmen-rahman-01/",
              "https://github.com/sowmenappd",
              "https://sowmenrahman.vercel.app",
            ],
            jobTitle: "Software Engineer",
          }`}
      </script>
    </Head>
    <Header />
    <Intro />
    <Home />
  </Layout>
);

export default Index;

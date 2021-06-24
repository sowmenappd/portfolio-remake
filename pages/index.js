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
  </Layout>
);

export default Index;

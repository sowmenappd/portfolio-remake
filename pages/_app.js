import App from "next/app";
import React from "react";
import BlogArticlesContext from "../BlogPosts.Context";
import getBlogArticles from "../getBlogs";

import getProjects from "../getProjects";
import ProjectsContext from "../Projects.Context";

import "../public/common.css";

class MyApp extends App {
  static async getInitialProps(appContext) {
    const appProps = await App.getInitialProps(appContext);
    const projects = await getProjects();
    const blogArticles = await getBlogArticles();

    return { ...appProps, projects: [], blogArticles };
  }

  render() {
    const { Component, pageProps, projects, blogArticles } = this.props;

    return (
      <>
        <BlogArticlesContext.Provider value={blogArticles}>
          <ProjectsContext.Provider value={projects}>
            <>
              <Component {...pageProps} />
            </>
          </ProjectsContext.Provider>
        </BlogArticlesContext.Provider>
      </>
    );
  }
}

export default MyApp;

import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import ReactMarkdown from "react-markdown";
import removeMd from "remove-markdown";

import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import Line from "../../components/Line";
import SEO from "../../components/SEO";
import Sidebar from "../../components/ProjectSidebar";
import ProjectsContext from "../../Projects.Context";
import styles from "./project.module.css";

const ProjectInfo = ({ data, data: { title, website }, content }) => {
  return (
    <Layout>
      <div className={styles.workWrapper}>
        <div className={styles.workInfo}>
          <div className={styles.topContainer}>
            <Line />
            <div className={styles.topInfo}>
              <h1 className={styles.workTitle}>{title}</h1>
              <div className={styles.container}>
                <div className={styles.inner}>
                  {content ? <ReactMarkdown source={content} /> : "Loading.."}
                  {website && (
                    <a
                      className={styles.websiteLink}
                      href={website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit website
                    </a>
                  )}
                </div>
                <Sidebar
                  {...data}
                  year={data.date.toString().substring(0, 4)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
const Post = () => {
  const {
    query: { wid },
  } = useRouter();

  useEffect(() => {
    setTimeout(() => {
      document.body.classList.add(styles.withAnim);
    }, 0);
  }, [wid]);

  const works = useContext(ProjectsContext);

  const {
    document: { data, content },
    images,
  } = works.find((w) => w.slug === wid);

  return (
    <>
      <Head>
        <title>{data.title}</title>
      </Head>
      <SEO
        title={data.title}
        description={removeMd(content.trim()).substring(0, 160)}
        image={data.featuredImg}
      />
      <Header />
      <article className={styles.work}>
        <ProjectInfo data={data} content={content} />
        <div className={styles.workImages}>
          <div className={styles.images}>
            <ReactMarkdown
              source={images.content}
              renderers={{ image: Img, paragraph: P }}
            />
          </div>
        </div>
      </article>

      <Footer noBorder />
    </>
  );
};

const P = ({ children }) => {
  if (
    children &&
    children[0] &&
    children.length === 1 &&
    children[0].props &&
    children[0].props.src
  ) {
    // rendering media without p wrapper

    return children;
  }

  return <p>{children}</p>;
};

const Img = ({ alt, src }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  if (src.match(/.mp4$/)) {
    return (
      <div
        className={[
          styles.imgContainer,
          inView ? styles.imgContainerAnim : "",
        ].join(" ")}
        ref={ref}
      >
        <video muted autoPlay src={inView ? src : ""}></video>
      </div>
    );
  }

  return (
    <Link href={src}>
      <a target="_blank" rel="noopener noreferrer">
        <div
          className={[
            styles.imgContainer,
            inView ? styles.imgContainerAnim : "",
          ].join(" ")}
          ref={ref}
        >
          <img srcSet={`${src} 2x`} alt={alt} />
        </div>
      </a>
    </Link>
  );
};

export default Post;

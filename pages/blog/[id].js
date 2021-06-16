import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import ReactMarkdown from "react-markdown";
import removeMd from "remove-markdown";
import BlogArticlesContext from "../../BlogPosts.Context";

import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import SEO from "../../components/SEO";
import styles from "./blogs.module.css";

import { FaArrowLeft as BackArrow } from "react-icons/fa";

const BlogView = ({ data, data: { title, website }, content }) => {
  return (
    <Layout>
      <div style={{ paddingTop: 20 }}>
        <div className={styles.workInfo}>
          <div className={styles.topContainer}>
            <div className={styles.topInfo}>
              <div className={styles.container}>
                <div className={styles.workDetails}>
                  <Link href="/blog">
                    <a>
                      <div style={{ marginBottom: "40px" }}>
                        <BackArrow size={40} color="blue" />
                      </div>
                    </a>
                  </Link>
                  <h1 className={styles.workTitle}>{title}</h1>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row-reverse",
                      alignItems: "center",
                    }}
                    className={styles.workDetailsContainer}
                  >
                    <div className={styles.workDetailsText}>
                      <p style={{ fontWeight: 600 }}>Sowmen Rahman</p>
                      <p style={{ color: "#282c35aa", fontSize: 16 }}>
                        29th May, 2021
                      </p>
                    </div>

                    <img
                      src={"/images/dp.png"}
                      style={{
                        borderRadius: "50%",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                </div>
                <div className={styles.inner}>
                  {content ? (
                    <ReactMarkdown
                      source={content}
                      renderers={{ image: Img, paragraph: P }}
                    />
                  ) : (
                    "Loading.."
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
const Blog = () => {
  const {
    query: { id },
  } = useRouter();

  useEffect(() => {
    setTimeout(() => {
      document.body.classList.add(styles.withAnim);
    }, 0);
  }, [id]);

  const blogArticles = useContext(BlogArticlesContext);

  const {
    document: { data, content },
    images,
  } = blogArticles.find((w) => w.slug === id);

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
      <Header smallLogo={true} />
      <article className={styles.work}>
        <BlogView data={data} content={content} />
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
          style={{ marginBottom: "20px" }}
        >
          <img srcSet={`${src} 2x`} alt={alt} />
        </div>
      </a>
    </Link>
  );
};

export default Blog;

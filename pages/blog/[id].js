import Head from "next/head";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import ReactMarkdown from "react-markdown";
import removeMd from "remove-markdown";

import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import SEO from "../../components/SEO";
import styles from "./blogs.module.css";

import getArticles, { getArticle } from "../../getBlogs";

import { FaArrowLeft as BackArrow } from "react-icons/fa";
import {
  AiFillHeart as HeartIcon,
  AiFillTwitterCircle as TwitterIcon,
} from "react-icons/ai";
import {
  FcComments as CommentIcon,
  FcShare as ShareIcon,
} from "react-icons/fc";

import { RiFacebookCircleFill as FbIcon } from "react-icons/ri";

const BlogView = ({ title, date, content }) => {
  return (
    <Layout>
      <div style={{ paddingTop: 0 }}>
        <div className={styles.topContainer}>
          <div className={styles.topInfo}>
            <div className={styles.container}>
              <div className={styles.workDetails}>
                <Link href="/blog">
                  <a style={{ textDecoration: "none" }}>
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
                  <img
                    src={"/images/dp.png"}
                    style={{
                      borderRadius: "50%",
                      objectFit: "contain",
                    }}
                  />
                  <div className={styles.workDetailsText}>
                    <p style={{ fontWeight: 600 }}>Sowmen Rahman</p>
                    <p style={{ color: "#282c35aa", fontSize: 16 }}>
                      {date || "Since time immemorial"}
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.inner}>
                {content ? (
                  <ReactMarkdown
                    source={content}
                    renderers={{
                      image: Img,
                      paragraph: P,
                    }}
                  />
                ) : (
                  "Loading.."
                )}
                <ReactionComponent />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const Blog = ({ article }) => {
  if (!article) return <div>Loading</div>;
  const { id, title, date, content, featuredImg } = article;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <SEO
        title={title}
        description={removeMd(content.trim()).substring(6, 160)}
        image={featuredImg}
        type="article"
      />
      <Header smallLogo={true} />
      <article className={styles.work}>
        <BlogView
          title={title}
          date={date}
          featuredImg={featuredImg}
          content={content}
        />
      </article>
      <Footer />
    </>
  );
};

const ReactionComponent = ({ likeCount = 29, commentCount = 10 }) => {
  return (
    <div
      style={{
        width: "100%",
        marginTop: 50,
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "20%",
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", padding: 10 }}>
          <HeartIcon size={40} color="red" />
          {29}
        </div>
        <div style={{ display: "flex", alignItems: "center", padding: 10 }}>
          <CommentIcon size={40} />
          {29}
        </div>
        <div style={{ display: "flex", alignItems: "center", padding: 10 }}>
          <FbIcon size={40} color="blue" />
        </div>{" "}
        <div style={{ display: "flex", alignItems: "center", padding: 10 }}>
          <TwitterIcon size={40} color="skyblue" />
        </div>
      </div>
    </div>
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

export async function getStaticProps(context) {
  const article = await getArticle(context.params.id);

  return {
    props: {
      article,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const articles = await getArticles();
  const paths = articles.map((a) => ({ params: { id: a.id } }));

  return {
    paths,
    fallback: true,
  };
}

export default Blog;

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
// import {
//   AiFillHeart as HeartIcon,
//   AiFillTwitterCircle as TwitterIcon,
// } from "react-icons/ai";
// import {
//   FcComments as CommentIcon,
//   FcShare as ShareIcon,
// } from "react-icons/fc";

import { RiFacebookCircleFill as FbIcon } from "react-icons/ri";
import { useState } from "react";

import ICONS from "../../utils/icons";
import CodeBlock from "../../components/CodeBlock";
// const HeartFilled = ICONS.Heart;
// const HeartOutlined = ICONS.HeartOutline;

const BlogView = ({ id, title, date, content, likes, onLike }) => {
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
                      heading: Heading,
                      code: CodeBlock,
                    }}
                  />
                ) : (
                  "Loading.."
                )}
                <ReactionComponent
                  id={id}
                  title={title}
                  likes={0} // likes
                  comments={[]}
                  onLike={null} // onLike
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const BlogSchema = ({ title, description, date, image }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": process.env.NEXT_PUBLIC_VERCEL_URL || "localhost:3000",
          },
          headline: title,
          description: description,
          image: process.env.NEXT_PUBLIC_VERCEL_URL + image,
          author: {
            "@type": "Person",
            name: "Sowmen Rahman",
          },
          publisher: {
            "@type": "Organization",
            name: "Sowmen Rahman",
            logo: {
              "@type": "ImageObject",
              url: "https://sowmenrahman.vercel.app/images/wide-logo.png",
            },
          },
          datePublished: date,
          dateModified: date,
        }),
      }}
    />
  );
};

const Blog = ({ article }) => {
  if (!article) return <div>Loading</div>;
  const { id, title, date, content, featuredImg, stats } = article;

  const [articleLikes, setArticleLikes] = useState(0); // stats.likes
  // const handleLike = async () => {
  //   const newStats = await likeArticle(id);
  //   setArticleLikes(newStats.likes);
  // };

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
      <BlogSchema
        title={title}
        description={removeMd(content.trim()).substring(6, 160)}
        date={date}
        image={featuredImg}
      />
      <article className={styles.work}>
        <BlogView
          id={id}
          title={title}
          date={new Date(date).toDateString().split(" ").slice(1).join(" ")}
          featuredImg={featuredImg}
          content={content}
          likes={articleLikes}
          onLike={null} // handleLike
        />
      </article>
      <Footer />
    </>
  );
};

const ReactionComponent = ({
  id,
  title,
  likes = 0,
  comments = [],
  onLike = null,
}) => {
  // const [liked, setLiked] = useState(false);

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
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* <div style={{ display: "flex" }}>
          <div
            style={{ display: "flex", alignItems: "center", padding: 10 }}
            onClick={() => {
              setLiked(true);
              onLike?.();
            }}
          >
            {liked ? (
              <HeartFilled
                size={40}
                color="red"
                className={styles.bouncingButton}
              />
            ) : (
              <HeartOutlined
                size={40}
                color="red"
                className={styles.bouncingButton}
              />
            )}
            <span style={{ fontWeight: "700", fontSize: 20, marginLeft: 6 }}>
              {likes}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", padding: 10 }}>
            <CommentIcon size={40} />
            <span style={{ fontWeight: "700", fontSize: 20, marginLeft: 6 }}>
              {comments.length}
            </span>
          </div> 
        </div>*/}
        <div style={{ display: "flex", padding: 5, alignItems: "center" }}>
          <span style={{ fontSize: 18 }}>Share on:</span>
          <span style={{ marginLeft: 10, marginRight: 10 }}>
            <a
              target="_blank"
              href={`https://www.facebook.com/sharer/sharer.php?u=${
                process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000"
              }/blog/${id}`}
            >
              {ICONS.Facebook({ size: 32, color: "blue" })}
            </a>
          </span>
          <span style={{ marginLeft: 10, marginRight: 10 }}>
            <a
              target="_blank"
              href={`http://twitter.com/share?url=${
                "https://" + process.env.NEXT_PUBLIC_VERCEL_URL ||
                "http://localhost:3000"
              }/blog/${id}`}
            >
              {ICONS.Twitter({ size: 32, color: "#1DA1F2" })}
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

const fontSize = {
  1: "42px",
  2: "36px",
  3: "32px",
  4: "28px",
  5: "24px",
  6: "20px",
};

const Heading = ({ children, level }) => {
  return (
    <h1 style={{ fontSize: fontSize[level] || 32, fontWeight: "700" }}>
      {children}
    </h1>
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
  const id = context.params.id;
  const article = await getArticle(id);
  // const stats = await getStats(id);

  return {
    props: {
      article, //stats
    },
    // revalidate: 60,
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

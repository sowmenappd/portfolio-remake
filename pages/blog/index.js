import Head from "next/head";
import Link from "next/link";
import { useContext, useState } from "react";
import Card from "../../components/Card";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import Pill from "../../components/Pill";

import styles from "./blogs.module.css";

import {
  DiAws as AwsIcon,
  DiDocker as DockerIcon,
  DiNodejs as NodeJsIcon,
} from "react-icons/di";
import BlogArticlesContext from "../../BlogPosts.Context";
import getBlogArticles from "../../getBlogs";

export default function Blogs({ props }) {
  const [categories, _] = useState([
    "Frontend",
    "Backend",
    "DevOps",
    "Gamedev",
  ]);
  const [selectedCategory, setCategory] = useState(categories[0]);

  const blogArticles = useContext(BlogArticlesContext);
  console.log("here", Object.keys(blogArticles[0].document.data));

  return (
    <Layout>
      <Head>
        <title>SRDev | Tech Articles</title>
      </Head>
      <Header />
      <div style={{ paddingTop: 120 }}>
        <div className={styles.topContainer2}>
          <div className={styles.topInfo}>
            <div className={styles.container}>
              <div className={styles.workDetails}>
                <h1 className={styles.workTitle}>Blog</h1>
                <BlogCategorySelectionPanel
                  onSelected={(cat) => setCategory(cat)}
                  categories={categories}
                  selectedCategory={selectedCategory}
                />
                <div
                  style={{
                    padding: "40px 0",
                    display: "flex",
                  }}
                >
                  {blogArticles.map(
                    ({
                      document: {
                        content,
                        data: {
                          title,
                          date,
                          services,
                          tech,
                          website,
                          featuredImg,
                        },
                      },
                      slug,
                    }) => (
                      <BlogArticleCard
                        href={slug}
                        title={title}
                        color="#272727"
                        techIcons={[AwsIcon, DockerIcon, NodeJsIcon]}
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps(content) {
  const articles = await getBlogArticles();
  console.log(Object.keys(articles));

  //   for (let doc of articles) {
  //     console.log(doc.data.date);
  //     doc.data.date = doc.data.date.toString();
  //   }

  return {
    props: { articles: {} },
  };
}

const BlogCategorySelectionPanel = ({
  categories,
  selectedCategory,
  onSelected,
}) => {
  return (
    <div className={styles.categoryContainer}>
      {categories.map((cat, i) => (
        <Pill
          key={i}
          title={cat}
          onPress={() => onSelected?.(cat)}
          color={cat === selectedCategory ? "white" : "black"}
          backgroundColor={cat === selectedCategory ? "teal" : "white"}
        />
      ))}
    </div>
  );
};

const BlogArticleCard = ({
  href,
  title,
  color,
  techIcons,
  textColor = "white",
}) => {
  return (
    <>
      <Link href={`/blog/${href}`}>
        <a>
          <>
            <Card
              style={{
                paddingTop: "16px",
                paddingBottom: "16px",
                paddingLeft: "14px",
                borderRadius: "10px",
                backgroundColor: color || "white",
                color: textColor || "black",
                lineHeight: "1.8em",
                height: "100%",
              }}
            >
              <h2>{title}</h2>
              <div
                style={{
                  paddingRight: "10px",
                  paddingTop: "0px",
                  marginRight: "10px",
                  display: "flex",
                  justifyContent: "flex-end",
                  fontWeight: 600,
                }}
              >
                1 MIN READ
              </div>
              <div
                style={{
                  padding: "10px 20px",
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                {techIcons.map((Icon) => (
                  <div style={{ margin: 2, fontSize: 50 }}>
                    <Icon />
                  </div>
                ))}
              </div>
            </Card>
          </>
        </a>
      </Link>
    </>
  );
};

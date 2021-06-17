import Head from "next/head";
import Link from "next/link";
import { useContext, useState } from "react";
import Card from "../../components/Card";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import Pill from "../../components/Pill";

import styles from "./blogs.module.css";

import ICONS from "../../utils/icons";
import getArticles from "../../getBlogs";
import SEO from "../../components/SEO";

export default function Blogs({ articles }) {
  const [categories] = useState(["Frontend", "Backend", "DevOps", "Gamedev"]);
  const [selectedCategory, setCategory] = useState(categories[0]);

  return (
    <Layout>
      <Head>
        <title>SRDev | Tech Articles</title>
      </Head>
      <SEO
        title="SRDev | Tech Articles"
        description="A collection of the best and most useful tech-related articles you'll find online"
        image={"/images/wide-logo.png"}
      />
      <Header />
      <div
        style={{
          paddingTop: 80,
        }}
      >
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
                <div className={styles.articlesContainer}>
                  {articles &&
                    articles
                      .filter((art) => art.category.includes(selectedCategory))
                      .map(({ id, title, tech }, i) => (
                        <BlogArticleCard
                          key={i}
                          href={id}
                          title={title}
                          color={colors[i % colors.length]}
                          techIcons={tech?.split(", ")}
                        />
                      ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

const colors = ["#272727", "#FF5666", "#208AAE", "#1C2321"];

const BlogCategorySelectionPanel = ({
  categories,
  selectedCategory,
  onSelected,
}) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
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
    <div className={styles.articleContainer}>
      <Link href={`/blog/${href}`}>
        <a>
          <div style={{ marginRight: "15px" }}>
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
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "320px",
              }}
            >
              <div
                style={{
                  paddingLeft: "10px",
                  paddingRight: "20px",
                }}
              >
                <h2>{title}</h2>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    fontWeight: 600,
                  }}
                >
                  1 MIN READ
                </div>
              </div>
              <div
                style={{
                  padding: "10px 20px",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  {techIcons?.map((iconName, i) => {
                    const IconComponent = ICONS[iconName];
                    return (
                      <div key={i} style={{ marginLeft: 5, marginRight: 5 }}>
                        <IconComponent size={35} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>
          </div>
        </a>
      </Link>
    </div>
  );
};

export async function getStaticProps(context) {
  const articles = await getArticles();

  return {
    props: { articles },
    revalidate: 60,
  };
}

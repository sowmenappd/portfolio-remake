import matter from "gray-matter";
import path from "path";

async function getArticles() {
  return new Promise((resolve) => {
    function getPages(indexCtx, imagesCtx) {
      const keys = indexCtx.keys();
      const values = keys.map(indexCtx);
      const data = keys.map((key, index) => {
        const id = key.match(/\/(.+)\/index/, "")[1];
        const value = values[index];
        const document = matter(value.default);
        // const images = matter(imagesCtx.keys().map(imagesCtx)[index].default);

        const obj = {
          id,
          title: document.data.title,
          date: document.data.date,
          tech: document.data.tech,
          category: document.data.category,
          featuredImg: document.data.featuredImg,
          content: document.content,
        };
        return obj;
      });
      return data;
    }

    const pages = getPages(
      require.context("./blogs", true, /index.md$/),
      null
      // require.context("./blogs", true, /images.md$/)
    );

    resolve(pages);
  });
}

export async function getArticle(id) {
  const articles = await getArticles();
  return articles.find((a) => a.id == id);
}

// export const getStats = async (id) => {
//   if (!id) return null;

//   const path = path.join(process.cwd(), "blog_data");
//   return stats;
// };

// export const likeArticle = async (id) => {
//   if (!id) return null;

//   const path = path.join(process.cwd(), "blog_data");

//   return res;
// };

export default getArticles;

import matter from "gray-matter";

async function getBlogArticles() {
  return new Promise((resolve) => {
    function getPages(indexCtx, imagesCtx) {
      const keys = indexCtx.keys();
      const values = keys.map(indexCtx);
      const data = keys.map((key, index) => {
        const slug = key.match(/\/(.+)\/index/, "")[1];
        const value = values[index];
        const document = matter(value.default);
        const images = matter(imagesCtx.keys().map(imagesCtx)[index].default);

        return {
          document,
          slug,
          images,
        };
      });
      return data;
    }

    const pages = getPages(
      require.context("./blogs", true, /index.md$/),
      require.context("./blogs", true, /images.md$/)
    );

    resolve(pages);
  });
}

export default getBlogArticles;

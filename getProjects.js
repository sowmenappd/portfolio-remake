import matter from "gray-matter";

async function getProjects() {
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
      require.context("./projects", true, /index.md$/),
      require.context("./projects", true, /images.md$/)
    );
    resolve(
      pages
        // TODO: add date sorting logic and remove filter function
        // .sort((a, b) => {
        //   const dA = new Date(a.document.data.date);
        //   const dB = new Date(b.document.data.date);
        //   return -(dA - dB);
        // })
        .filter(
          (page) => new Date(page.document.data.date).getFullYear() > 2020
        )
    );
  });
}

export default getProjects;

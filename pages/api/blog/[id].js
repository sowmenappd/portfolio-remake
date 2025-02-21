import path from "path";
import fs from "fs";

export default function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  let status = 404;
  let jsonData;

  try {
    const dataPath = path.join(process.cwd(), "/blog_data/", `${id}.json`);
    if (fs.existsSync(dataPath)) {
      jsonData = JSON.parse(fs.readFileSync(dataPath).toString());
      status = 200;
    }

    if (method === "POST") {
      const likes = jsonData.likes + 1;
      jsonData.likes = likes;
      fs.writeFileSync(dataPath, JSON.stringify(jsonData));
      console.log("likes ", likes, id);
      res.send({ status, ...jsonData });
    } else if (method === "GET") {
      res.send({
        ...jsonData,
        status,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ status: 404, error: "Invalid request." });
  }
}

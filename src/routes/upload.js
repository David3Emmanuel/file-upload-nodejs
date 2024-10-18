import fs from "fs/promises";
import Router from "../../lib/Router.js";

const router = new Router();

router.post("/", (req, res) => {
  // TODO restrict file size
  // TODO deny access to .meta.json

  const { file } = req.body;
  const query = req.query;
  const name = query.get("name");

  if (!file) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "No file uploaded" }));
    return;
  }

  const metadata = {
    name: name || file.fileName,
    originalName: file.fileName,
    size: file.contents.length,
    contentType: file.contentType,
    uploadTime: Date.now(),
  };

  fs.writeFile(`./uploads/${metadata.name}`, file.contents, {
    mode: 0o700,
  })
    .then(() => saveMetadata(metadata))
    .then(() => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Uploaded", metadata }));
    })
    .catch((err) => {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: err.message }));
    });
});

function saveMetadata(metadata) {
  let allMetadata = {};
  fs.readFile("./uploads/.meta.json")
    .then((data) => {
      allMetadata = JSON.parse(data);
    })
    .catch(() => {
      fs.writeFile("./uploads/.meta.json", "{}");
    });

  allMetadata[metadata.name] = metadata;
  return fs.writeFile(
    "./uploads/.meta.json",
    JSON.stringify(allMetadata, null, 2)
  );
}

export default router;

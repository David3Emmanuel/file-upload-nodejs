import Router from "../../lib/Router.js";
import fs from "fs/promises";

const router = new Router();

router.get("/", (req, res) => {
  // If file query parameter is provided, return the file
  if (req.query.has("file")) {
    const fileName = req.query.get("file");

    Promise.all([
      fs.readFile("./uploads/.meta.json"),
      fs.readFile(`./uploads/${fileName}`),
    ])
      .then(([allMetadata, data]) => {
        const metadata = JSON.parse(allMetadata)[fileName];
        if (!metadata) throw new Error("File Not Found");
        res.writeHead(200, { "Content-Type": metadata.contentType });
        res.end(data);
      })
      .catch((err) => {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "File Not Found" }));
      });
    // Get all files in the uploads directory
  } else {
    fs.readdir("./uploads")
      .then((files) => {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ files }));
      })
      .catch((err) => {
        console.error(err);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Internal Server Error" }));
      });
  }
});

router.get("/metadata", (req, res) => {
  fs.readFile("./uploads/.meta.json").then((metadata) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(metadata);
  });
});

router.delete("/", (req, res) => {
  const fileName = req.query.get("file");
  Promise.all([
    fs.rm(`./uploads/${fileName}`),
    fs.readFile("./uploads/.meta.json"),
  ])
    .then(([_, allMetadata]) => {
      const metadata = JSON.parse(allMetadata);
      metadata[fileName] = undefined;
      return fs.writeFile("./uploads/.meta.json", JSON.stringify(metadata));
    })
    .then(() => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "File Deleted" }));
    })
    .catch((err) => {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "File Not Found" }));
    });
});

export default router;

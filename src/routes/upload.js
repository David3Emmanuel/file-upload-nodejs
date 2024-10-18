import fs from "fs/promises";
import Router from "../../lib/Router.js";

const router = new Router();

router.post("/", (req, res) => {
  const { name, file } = req.body;
  if (!file) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "No file uploaded" }));
    return;
  }
  fs.writeFile(`./uploads/${name || file.fileName}`, file.contents, {
    mode: 0o765,
  })
    .then(() => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ message: "Uploaded", ...file, contents: undefined })
      );
    })
    .catch((err) => {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: err.message }));
    });
});

export default router;

import Router from "../../lib/Router.js";
import fs from "fs/promises";

const router = new Router();

router.get("/", (req, res) => {
  // Get all files in the uploads directory
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
});

export default router;

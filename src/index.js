import Server from "../lib/Server.js";
import uploadRouter from "./routes/upload.js";

const server = new Server();
const router = server.router;

router.get("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello, World!");
});
router.route("/upload", uploadRouter);

server.start(3001);

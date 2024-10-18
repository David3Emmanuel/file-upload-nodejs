import fs from "fs/promises";

import Server from "../lib/Server.js";
import uploadRouter from "./routes/upload.js";
import filesRouter from "./routes/files.js";

fs.mkdir("./uploads").catch(() => {});

const server = new Server();
const router = server.router;

router.route("/upload", uploadRouter);
router.route("/files", filesRouter);

server.start(3001);

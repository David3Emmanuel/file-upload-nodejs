import { createServer, IncomingMessage, ServerResponse } from "http";
import Router from "./Router.js";
import processRequest from "./processRequest.js";

export default class Server {
  constructor() {
    this.router = new Router();

    this.server = createServer((req, res) => {
      let rawBody = [];

      req.on("data", (chunk) => {
        rawBody.push(chunk);
      });

      req.on("end", () => {
        processRequest(req, Buffer.concat(rawBody));
        this.handleRequest(req, res);
      });
    });
  }

  /**
   * @param {IncomingMessage} req
   * @param {ServerResponse<IncomingMessage>} res
   */
  handleRequest(req, res) {
    const method = req.method;
    const url = req.url;
    const handler = this.router.getHandler(method, url);
    if (!handler) {
      // TODO handle 404
      res.statusCode = 404;
      res.end();
      return;
    }
    handler(req, res);
  }

  start(port) {
    this.server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
}

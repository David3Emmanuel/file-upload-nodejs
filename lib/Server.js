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
    const handler = this.router.handle(method, url);
    if (!handler) {
      res.statusCode = 404;
      res.end();
      return;
    }
    handler(req, res);
  }

  /**
   *
   * @param {"GET" | "POST" | "PATCH" | "DELETE"} method
   * @param {string} url
   * @param {(req: IncomingMessage, res: ServerResponse<IncomingMessage>) => void} handler
   */
  add(method, url, handler) {
    this.router.add(method, url, handler);
  }

  /**
   *
   * @param {string} url
   * @param {(req: IncomingMessage, res: ServerResponse<IncomingMessage>) => void} handler
   */
  get(url, handler) {
    this.add("GET", url, handler);
  }

  /**
   *
   * @param {string} url
   * @param {(req: IncomingMessage, res: ServerResponse<IncomingMessage>) => void} handler
   */
  post(url, handler) {
    this.add("POST", url, handler);
  }

  /**
   *
   * @param {string} url
   * @param {(req: IncomingMessage, res: ServerResponse<IncomingMessage>) => void} handler
   */
  patch(url, handler) {
    this.add("PATCH", url, handler);
  }

  /**
   *
   * @param {string} url
   * @param {(req: IncomingMessage, res: ServerResponse<IncomingMessage>) => void} handler
   */
  delete(url, handler) {
    this.add("DELETE", url, handler);
  }

  start(port) {
    console.log(this.router);
    this.server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
}

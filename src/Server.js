import { createServer, IncomingMessage, ServerResponse } from "http";

export default class Server {
  constructor() {
    this.routes = {};

    this.server = createServer((req, res) => {
      let rawBody = Buffer.alloc(0);

      req.on("data", (chunk) => {
        rawBody = Buffer.concat([rawBody, chunk]);
      });

      req.on("end", () => {
        const body = JSON.parse(rawBody.toString("utf-8"));
        req.body = body;
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
    const handler = this.routes[url]?.[method];
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
    if (!this.routes[url]) {
      this.routes[url] = {};
    }
    this.routes[url][method] = handler;
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
    console.log(this.routes);
    this.server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
}

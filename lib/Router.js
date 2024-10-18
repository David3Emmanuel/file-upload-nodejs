import { IncomingMessage, ServerResponse } from "http";

export default class Router {
  constructor() {
    this.routes = {};
    this.handlers = {};
  }

  /**
   *
   * @param {string} method
   * @param {string} url
   * @param {(req: IncomingMessage, res: ServerResponse<IncomingMessage>) => void} handler
   */
  add(method, url, handler) {
    const urlParts = url
      .split("/")
      .map((part) => part.trim())
      .filter((part) => part);

    let current = this;
    for (const part of urlParts) {
      if (current.routes[part]) {
        current = current.routes[part];
      } else {
        const router = new Router();
        current.routes[part] = router;
        current = router;
      }
    }

    current.handlers[method] = handler;
  }

  /**
   *
   * @param {string} url
   * @param {Router} router
   */
  route(url, router) {
    const urlParts = url
      .split("/")
      .map((part) => part.trim())
      .filter((part) => part);

    let current = this;
    for (const part of urlParts) {
      if (current.routes[part]) {
        current = current.routes[part];
      } else {
        const newRouter = new Router();
        current.routes[part] = newRouter;
        current = newRouter;
      }
    }
    current.routes = router.routes;
    current.handlers = router.handlers;
  }

  getHandler(method, url) {
    const urlParts = url
      .split("/")
      .map((part) => part.trim())
      .filter((part) => part);

    let current = this;
    for (const part of urlParts) {
      if (current.routes[part]) current = current.routes[part];
      else return null;
    }

    return current.handlers[method] || null;
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
}

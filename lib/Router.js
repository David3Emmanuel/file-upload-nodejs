export default class Router {
  constructor() {
    this.routes = {};
  }

  add(method, url, handler) {
    if (!this.routes[url]) {
      this.routes[url] = {};
    }
    this.routes[url][method] = handler;
  }

  handle(method, url) {
    return this.routes[url] && this.routes[url][method];
  }
}

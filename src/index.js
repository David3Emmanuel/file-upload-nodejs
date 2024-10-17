import Server from "./Server.js";

const server = new Server();

server.get("/hello", (req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Hello, World!" }));
});

server.start(3001);

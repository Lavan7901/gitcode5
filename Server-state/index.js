const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const port = 3015;
console.log(port);

server.use(middlewares);
server.use(router);
server.listen(port);

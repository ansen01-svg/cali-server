require("dotenv").config();
let socket = require("socket.io");
let app = require("./app");
let socketMain = require("./socket");

let port = process.env.PORT || 5005;

let server = app.listen(port, () =>
  console.log(`server is listening on port ${port}...`)
);

server.timeout = 0;

let io = socket(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  socketMain(io, socket);
});

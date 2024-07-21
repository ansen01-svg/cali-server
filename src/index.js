require("dotenv").config();
let socket = require("socket.io");
let app = require("./app");
let socketMain = require("./socket");

let port = process.env.PORT || 5005;

let server = app.listen(port, () =>
  console.log(`server is listening on ${port}...`)
);

let io = socket(server, {
  cors: { origin: process.env.CLIENT },
});

io.on("connection", (socket) => {
  socketMain(io, socket);
});

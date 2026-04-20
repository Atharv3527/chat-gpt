const app = require("./src/app");
require("dotenv").config();
const connectDB = require("./src/db/db");
const initsocketServer = require("./src/sockets/socket.server");

const httpServer = require("http").createServer(app);
connectDB();
initsocketServer(httpServer);

httpServer.listen(3000, () => {
  console.log("Server is running on port 3000");
});

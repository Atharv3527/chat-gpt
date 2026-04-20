const app = require("./src/app")
require("dotenv").config();
const connectDB = require("./src/db/db")
const initsocketServer = require("./src/sockets/socket.server");
const PORT = process.env.PORT || 3000;

const httpServer = require("http").createServer(app);
connectDB();
initsocketServer(httpServer);

httpServer.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
        console.error(`Port ${PORT} is already in use. Set a different PORT in .env or stop the process using it.`);
        process.exit(1);
    }
    throw err;
});


httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
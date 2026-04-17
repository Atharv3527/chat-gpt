const express = require("express")
const cookieParser = require("cookie-parser")
/*Routes */
const authRoutes = require("./routes/auth.route")
const chatRoutes = require("./routes/chat.route")


const app = express();

/*Using Middlewares */
app.use(express.json())
app.use(cookieParser())


/*Using Routes */
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

module.exports = app;
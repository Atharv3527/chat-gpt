const express = require("express");
const { createChat } = require("../controllers/chat.controller");
const chatController = require("../controllers/chat.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

/*POST/api/chat/ */
router.post("/", authMiddleware.authUser, chatController.createChat);
module.exports = router;

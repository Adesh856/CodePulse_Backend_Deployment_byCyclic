const { chat, getAllChats } = require("../Controller/Chat.controller");
// const { checkApiKey } = require("../middlewares/apiKey");
const chatRouter = require("express").Router();

chatRouter.route("/chat").post( chat);
chatRouter.route("/getchats").get( getAllChats);

module.exports = chatRouter;

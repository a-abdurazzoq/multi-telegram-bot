const Router = require("express").Router
const router = Router()
const TelegramController = require("../controllers/Telegram.controller")

router.use("/bot/:bot_id", TelegramController.bot)
router.post("/register-bot", TelegramController.registerBot)
router.post("/send-message-to-bot", TelegramController.sendMessageToBot)

module.exports = router
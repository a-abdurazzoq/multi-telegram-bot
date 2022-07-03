const { Schema, model } = require('mongoose')

const TelegramBotSchema = new Schema(
    {
        nickname: String,
        username: String,
        bot_id: String,
        token: String
    },
    {
        versionKey: false
    }
)

module.exports = model("telegram_bot", TelegramBotSchema)
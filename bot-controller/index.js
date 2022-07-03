const RegisteredUserModel = require("../models/RegisteredUser.model")

module.exports = (bot) => {
    bot.start(async (ctx) => {
        try {
            let { id, is_bot, first_name, last_name, username } = ctx.from
            if(is_bot) throw new Error("Is not user")
            RegisteredUserModel.create({
                bot_id: ctx.botInfo.id,
                user_id: id,
                first_name: first_name,
                last_name: last_name,
                username: username,
                phone_number: ""
            })

            return ctx.reply("Скоро...", {
                reply_markup: {
                    inline_keyboard: [
                        [ { text: "Сайт", url: "https://worksale.uz" }, { text: "Instagram", url: "https://instagram.com/worksaleuz/" }, { text: "Telegram", url: "https://t.me/worksaleuz" } ],
                    ]
                }
            })
        } catch (error) {
            console.log(error);
            return ctx.reply(`Произошла ошибка\nПричина: ${error.message}`)
        }
    })
}
const Telegraf = require('telegraf').Telegraf
const botController = require("../bot-controller")
const TelegramBotModel = require('../models/TelegramBot.model')


const { HOST } = process.env

class TelegramBotService {
    async setWebHooksToAllBots () {
        try {
            let bot
            let telegramBots = TelegramBotModel.find()
            for await (let telegramBot of telegramBots) {
                bot = new Telegraf(telegramBot.token)
                await bot.telegram.setWebhook(`${HOST}/bot/${telegramBot.token}`);
                process.once('SIGINT', () => bot.stop('SIGINT'))
                process.once('SIGTERM', () => bot.stop('SIGTERM'))
            }
            return true
        } catch (error) {
            console.log(error);
            return error
        }
    }
    async setWebHookToBot (token, botId) {
        try {
            const bot = new Telegraf(token)
            await bot.telegram.setWebhook(`${HOST}/bot/${botId}`);
            process.once('SIGINT', () => bot.stop('SIGINT'))
            process.once('SIGTERM', () => bot.stop('SIGTERM'))
            return true
        } catch (error) {
            console.log(error);
            return error   
        }
    }
    async registerNewBot ({token, botId, nickname, username}) {
        return await TelegramBotModel.create({
            token: token,
            bot_id: botId,
            first_name: nickname,
            username: username
        })
    }
}

module.exports = new TelegramBotService()
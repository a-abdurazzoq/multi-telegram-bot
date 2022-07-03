const botController = require('../bot-controller');
const RegisteredUserModel = require('../models/RegisteredUser.model');
const TelegramBotModel = require('../models/TelegramBot.model');
const TelegramBotService = require('../services/TelegramBot.service');

const Telegraf = require('telegraf').Telegraf

class TelegramController {
    async bot (req, res) {
        try {
            console.log(req.params.bot_id);
            const {token} = await TelegramBotModel.findOne({bot_id: req.params.bot_id})
            if(!token) throw new Error("Bot not found")
            let bot = new Telegraf(token)
            bot.handleUpdate(req.body)
            botController(bot)
        } catch (error) {
            console.log(error);
        } finally {
            return res.status(200).end()
        }
    }
    async registerBot (req, res) {
        try {
            const {token} = req.body
            const bot = new Telegraf(token)
            let {id, is_bot, first_name, username} = await bot.telegram.getMe()
            if(!is_bot) throw new Error("This token does not belong to a bot")
            const registeredBot = await TelegramBotService.registerNewBot({
                token: token,
                botId: id,
                nickname: first_name,
                username: username
            })
            await TelegramBotService.setWebHookToBot(token, registeredBot.bot_id)
            res.status(201).json({success: true, data: registeredBot})
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, error: error.stack})
        }
    }
    async sendMessageToBot (req, res) {
        try {
            const { id, message } = req.body
            let { token, bot_id } = await TelegramBotModel.findById(id)
            const bot = new Telegraf(token)
            let users = await RegisteredUserModel.find({bot_id: bot_id})
            for (let user of users) {
                await bot.telegram.sendMessage(user.user_id, message)
            } 
            res.status(200).json({success: true})
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, error: error.message})
        }
    }
}

module.exports = new TelegramController()
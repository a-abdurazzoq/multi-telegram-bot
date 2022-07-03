const { Schema, model } = require("mongoose")

const RegisteredUser = new Schema({
    bot_id: String,
    user_id: String,
    first_name: String,
    last_name: String,
    username: String,
    phone_number: String
})

module.exports = model("registered_users", RegisteredUser)
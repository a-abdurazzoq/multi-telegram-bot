const mognoose = require('mongoose')

module.exports = async (URL) => {
    mognoose.connection.on('open', () => console.log('Connect to database'))
    return await mognoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}
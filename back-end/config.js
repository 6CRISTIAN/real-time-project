require('dotenv').config()

module.exports = {
    port: process.env.PORT || 3000,
    db: {
        username: '',
        password: '',
        database: '',
        host: 'localhost',
        port: '5432',
        channel: 'updated'
    }
}
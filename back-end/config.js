require('dotenv').config()

module.exports = {
    port: process.env.PORT || 3000,
    database: {
        username: 'postgres',
        password: 'T3cn0l0g7 L34rn1ng psql',
        database: 'real-time',
        host: 'localhost'
    }
}
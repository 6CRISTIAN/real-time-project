const sequelize = require('./database/db')
const { port, db } = require('./config')

const express = require('express')
const app = express()

const http = require('http').Server(app)
const io = require('socket.io')(http)

const createSubscriber = require('pg-listen')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    next()
})

app.use('/api/v1/friends', require('./routes/friend'))

io.on('connection', (socket) => {
    console.log('connected!')
    socket.on('disconnect', () => {
        console.log('disconnected!')
    })
})

const subscriber = createSubscriber({
    connectionString: `postgres://postgres:${db.password}@localhost:${db.port}/${db.database}`
})

subscriber.notifications.on(db.channel, msg => {
    const { my_friend_id, updated_values } = msg
    io.emit(db.channel, { my_friend_id, updated_values })
});

(async () => {
    await subscriber.connect()
    await subscriber.listenTo(db.channel)
})();

http.listen(port, () => {
    console.log(`listening http://localhost:${port}`)
    sequelize.sync().catch(_ => console.log('·········> connect failure'))
})
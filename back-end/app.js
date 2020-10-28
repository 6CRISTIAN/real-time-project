const sequelize = require('./database/db')
const { port, database } = require('./config')

const express = require('express')
const app = express()

const http = require('http').Server(app)
var io = require('socket.io')(http)


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

http.listen(port, () => {
    console.log(`listening http://localhost:${port}`)
    // sequelize.sync().catch(_ => console.log('·········> connect failure'))
})
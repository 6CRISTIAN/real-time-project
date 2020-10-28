const sequelize = require('./database/db')
const { port } = require('./config')
const express = require('express')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    next()
})

app.use('/api/v1/friends', require('./routes/friend'))

app.listen(port, () => {
    console.log(`listening http://localhost:${port}`)
    sequelize.sync().catch(_ => console.log('·········> connect failure'))
})
const sequelize = require('./database/db')
const { port } = require('./config')
const express = require('express')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/friends', require('./routes/friend'))

app.listen(port, () => {
    console.log(`listening http://localhost:${port}`)

    sequelize.sync()
        .then(_ => { console.log('success connect!') })
        .catch(err => { console.log('connect failure!', err) })
})
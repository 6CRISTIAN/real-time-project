const Friend = require('../database/models/friend')
const express = require('express')
const router = express.Router()


router.get('/', (req, res) => {
    Friend.findAll()
        .then(friends => { res.json(friends) })
        .catch(err => { res.json(err) })
})


router.get('/:id', (req, res) => {
    Friend.findByPk(req.params.id)
        .then(friend => { res.json(friend) })
        .catch(err => { res.json(err) })
})


router.post('/', (req, res) => {
    Friend.create({
        name: req.body.name,
        gender: req.body.gender
    })
        .then(friend => { res.json(friend) })
        .catch(err => { res.json(err) })
})


router.put('/:id', (req, res) => {
    Friend.update({
        name: req.body.name,
        gender: req.body.gender
    }, {
        where: { id: req.params.id }
    })
        .then(friend => { res.json(friend) })
        .catch(err => { res.json(err) })
})


router.delete('/:id', (req, res) => {
    Friend.destroy({
        where: { id: req.params.id }
    })
        .then(friend => { res.json(friend) })
        .catch(err => { res.json(err) })
})


module.exports = router
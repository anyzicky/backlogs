const express = require('express')
const router = express.Router()
const categories = require('../services/categories')

router.get('/', function(req, res,  next) {
    try {
        res.json(categories.getAll());
    } catch (err) {
        console.error(`Error while getting posts`, err.message)
        next(err)
    }
})

module.exports = router;
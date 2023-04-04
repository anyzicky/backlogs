const express = require('express')
const router = express.Router()
const posts = require('../services/posts')

router.get('/', function(req, res,  next) {
    try {
        res.json(posts.getMultiple(req.query.page, req.query.category, req.query.year, req.query.search));
    } catch (err) {
        console.error(`Error while getting posts`, err.message)
        next(err)
    }
})

router.delete('/:id', (req, res, next) => {
    try {
        res.json(posts.remove(req.params.id));
    } catch (err) {
        console.error(`Error while delete posts`, err.message)
        next(err)
    }
});

router.post('/', (req, res, next) => {
    try {
        res.json(posts.create(req.body));
    } catch (err) {
        console.error(`Error while adding post `, err.message);
        next(err);
    }
})

router.get('/years', function(req, res, next) {
    try {
        res.json(posts.getYears())
    } catch (err) {
        console.log(`Error get years`, err.message)
        next(err)
    }
})

module.exports = router;
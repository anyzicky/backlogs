const db = require('../services/db')

function getAll() {
    const data = db.query(`SELECT * FROM category`, [])
    return data
}

module.exports = {
    getAll
}
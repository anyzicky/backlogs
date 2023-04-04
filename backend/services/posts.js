const db = require('../services/db')
const config = require('../config/posts')


function create(post) {

    const {name, year, rating, category_id, description } = post 
    const result = db.run(
        'INSERT INTO posts (name, year, rating, category_id, description) VALUES (@name, @year, @rating, @category_id, @description)', 
        {name, year, rating, category_id, description}
    );
    return result;
}

function remove(id) {
    const data = db.run(`DELETE FROM posts WHERE id=@id`, {id})
    return data
}

function getMultiple(page = 1, category = 0, year = 0, search = '') {
    const offset = (page - 1) * config.listPerPage;
    let whereCount = ``
    let query = `SELECT * FROM posts`
    let where = []
    if(category > 0) where.push(`category_id=${category}`)
    if(year > 0) where.push(`year=${year}`)
    if(search.length) where.push(`name LIKE '%${search}%'`)
    if(where.length) {
        whereCount = ` WHERE ` + where.join(' AND ')
        query += whereCount
    }

    query += ` ORDER BY ID DESC LIMIT ?,?`

    const data = db.query(query, [offset, config.listPerPage])//`SELECT * FROM posts ORDER BY ID DESC LIMIT ?,?`
    const total = db.get(`SELECT COUNT(*) as posts FROM posts ${whereCount}`, [])

    const meta = {
        currentPage: page,
        total: total.posts,
        pages: Math.ceil(total.posts / config.listPerPage)
    }
    return {
        data,
        meta
    }
}

function getYears() {
    const data = db.query('SELECT year FROM posts GROUP BY year', [])
    return data
}

module.exports = {
    getMultiple, getYears, create, remove
}
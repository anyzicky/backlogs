const express = require('express')
const app = express()
var cors = require('cors')
const port = 3000 || process.env.PORT;
const postsRoutes = require('./backend/routes/posts')
const categoriesRoutes = require('./backend/routes/categories')

app.use(cors())
app.use(express.json());

app.get('/', (req, res) => res.json({message: 'alive'}))

app.use('/posts', postsRoutes)
app.use('/categories', categoriesRoutes)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
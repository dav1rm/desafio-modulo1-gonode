const express = require('express')
const nunjucks = require('nunjucks')

const app = express()
nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

// Express trabalhar com formularios
app.use(express.urlencoded({ extended: false }))
// Setando template nunjacks
app.set('view engine', 'njk')

app.get('/', (req, res) => {
  return 'Hello world'
})

app.listen(3000)

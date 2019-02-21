const express = require('express')
const nunjucks = require('nunjucks')

const app = express()
// Configurando nunjucks
nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

// Express trabalhar com formularios
app.use(express.urlencoded({ extended: false }))
// Setando template nunjucks
app.set('view engine', 'njk')

// Middlware para validar query param idade
const validatorMiddlware = (req, res, next) => {
  if (!req.query.idade) {
    return res.redirect('/')
  }
  return next()
}
// Rota inicial com formulario de idade
app.get('/', (req, res) => {
  return res.render('age')
})

// Rota para checar a idade digitada
app.post('/check', (req, res) => {
  const { age } = req.body
  if (age >= 18) {
    return res.redirect(`/major?idade=${age}`)
  }
  return res.redirect(`/minor?idade=${age}`)
})

// Rota para mostrar pagina com mensagem
app.get('/major', validatorMiddlware, (req, res) => {
  const { idade } = req.query
  return res.render('major', { idade })
})

// Rota para mostrar pagina com mensagem
app.get('/minor', validatorMiddlware, (req, res) => {
  const { idade } = req.query
  return res.render('minor', { idade })
})

// Setando porta
app.listen(3000)

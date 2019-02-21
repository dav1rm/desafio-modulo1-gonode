const express = require('express')
const nunjucks = require('nunjucks')

const app = express()
// Configurando nunjacks
nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

// Express trabalhar com formularios
app.use(express.urlencoded({ extended: false }))
// Setando template nunjacks
app.set('view engine', 'njk')

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
  if (req.body.age >= 18) {
    return res.redirect(`/major?idade=${req.body.age}`)
  }
  return res.redirect(`/minor?idade=${req.body.age}`)
})

// Rota para mostrar pagina com mensagem
app.get('/major', validatorMiddlware, (req, res) => {
  return res.render('major', { idade: req.query.idade })
})

// Rota para mostrar pagina com mensagem
app.get('/minor', validatorMiddlware, (req, res) => {
  return res.render('minor', { idade: req.query.idade })
})

app.listen(3000)

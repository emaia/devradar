const { Router } = require('express')
const DevController = require('./controllers/DevController')
const ContactController = require('./controllers/ContactController')
const SearchController = require('./controllers/SearchController')
const { contactValidationRules, validate } = require('./utils/validator')

const routes = Router()

routes.get('/', (req, res) => {
  return res.json({ data: 'Hello dev!' })
})

routes.get('/devs', DevController.index)
routes.post('/devs', DevController.store)
routes.delete('/devs/:id', DevController.delete)

routes.get('/search', SearchController.index)

routes.post('/contact/send', contactValidationRules(), validate, ContactController.store)

module.exports = routes

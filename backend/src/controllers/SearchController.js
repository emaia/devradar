const Dev = require('../models/Dev')
const { parseStringAsArray } = require('../utils/helpers')

module.exports = {
  async index(req, res) {

    const { longitude, latitude, techs, distance = 10000 } = req.query

    const techsArr = parseStringAsArray(techs)

    try {
      const devs = await Dev.find({
        // Filtrar por tecnologias
        techs: {
          $in: techsArr
        },
        // Buscar por raio de 10km
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [longitude, latitude]
            },
            $maxDistance: distance
          }
        }
      })
  
      return res.json({ devs })
    } catch(e) {
      return res.status(500).json({ message: `An error occurred.`, error: `${e}` })
    }
    
  }
}
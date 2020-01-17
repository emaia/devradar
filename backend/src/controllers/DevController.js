const axios = require('axios')
const Dev = require('../models/Dev')
const { parseStringAsArray } = require('../utils/helpers')

module.exports = {

  async index(req, res) {
    try {
      const devs = await Dev.find()
      return res.json({ devs })
    } catch(e) {
      return res.status(500).json({ message: `An error occurred.`, error: `${e}` })
    }
  },

  async store(req, res) {

    const { github_username, techs, latitude, longitude } = req.body
  
    try {

      let dev = await Dev.findOne({ github_username })

      if(!dev) {

        const response = await axios.get(`https://api.github.com/users/${github_username}`)

        const { name = login, avatar_url, bio } = response.data

        const techsArr = parseStringAsArray(techs)

        const location = {
          type: 'Point',
          coordinates: [ longitude, latitude ]
        }

        dev = await Dev.create({
          github_username,
          name,
          avatar_url,
          bio,
          techs: techsArr,
          location
        })

        return res.status(201).json({ dev })

      }
        
      return res.json({ message: `The user ${dev.github_username} already exists.` })

    } catch (e) {
      if('response' in e) {
        if(e.response.status === 404) return res.status(404).json({ message: 'User not found on GitHub!' })
      }
      return res.status(500).json({ message: `An error occurred.`, error: `${e}` })
    }

  },

  async delete(req, res) {

    try {
      await Dev.findOneAndDelete({ github_username: req.params.id }, (err, doc) => {
        if (err) return res.status(500).json({ message: err })
        if (!doc) return res.status(404).json({ message: 'User not found!' })
        return res.json({ message: `${doc.github_username} was successfully deleted!` })
      })
    } catch (error) {
      return res.status(500).json({ message: `An error occurred.`, error: `${e}` })
    }
    
  }

}

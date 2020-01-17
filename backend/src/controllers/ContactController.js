const Contact = require('../models/Contact')

module.exports = {
  async store(req, res) {
    
    const { name, email, message } = req.body

    try {
      const contact = await Contact.create({
        name,
        email,
        message
      })
  
      return res.json({ contact })
    } catch(e) {
      return res.status(500).json({ message: `An error occurred.`, error: `${e}` })
    }
  }
}
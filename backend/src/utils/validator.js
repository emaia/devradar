const { check, validationResult } = require('express-validator')

const contactValidationRules = () => {
  return [
    // email must be an email
    check('email', 'The e-mail field is invalid').isEmail(),
    // message must be at least 5 chars long
    check('message', 'Deve ter no mínimo 5').isLength({ min: 5 }),
  ]
}

const validate = (req, res, next) => {

  const errors = validationResult(req)
  
  if (errors.isEmpty()) {
    return next()
  }

  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })

}

module.exports = {
  contactValidationRules,
  validate,
}

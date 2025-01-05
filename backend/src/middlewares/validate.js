const { validationResult } = require('express-validator')
const { DataValidationError } = require('../errors/')

const validate = async(req, res, next) => {
    const errors = validationResult(req)
    if (errors.array().length !== 0) {
        return next(new DataValidationError("Data Validation Error", errors.array()))
    }
    return next()
}

module.exports = validate
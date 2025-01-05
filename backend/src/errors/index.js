const GeneralError = require('./GeneralError')
const DataValidationError = require('./DataValidationError')
const UserNotFoundError=require("./UserNotFoundError")
const DataNotFoundError=require("./DataValidationError")
const UnauthorizedError = require('./UnauthorizedError')

module.exports = {
    GeneralError,
    DataValidationError,
    UserNotFoundError,
    DataNotFoundError,
    UnauthorizedError
}   
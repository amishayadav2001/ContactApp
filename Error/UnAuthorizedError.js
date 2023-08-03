const BaseError = require("./BaseError");

class UnauthorizedError extends BaseError{
    constructor(specificMessage){
        super("UnAuthorizedError", "UnAuthorized Access", 401)
        this.specificMessage = specificMessage
    }
}

module.exports = UnAuthorizedError





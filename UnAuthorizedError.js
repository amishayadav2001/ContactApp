const BaseError = require("./BaseError");

class UnAuthorizedError extends BaseError{
    constructor(specificMessage){
        super("UnAuthorizedError", "UnAuthorized Access", 401)
        this.specificMessage = specificMessage
    }
}

module.exports = UnAuthorizedError





const BaseError = require("./BaseError")

class NotFoundError extends BaseError {
    constructor(specificMessage){
        super("NotFoundError", "user not found", 404)
        this.specificMessage = specificMessage

    }
}

module.exports = NotFoundError


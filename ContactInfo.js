const ValidationError = require("./Error/ValidationError")

class ContactInfo {
  static ID = 0
  constructor(typeOfContactInfo, valueOfContactInfo) {
    this.ID = ContactInfo.ID++
    this.typeOfContactInfo = typeOfContactInfo
    this.valueOfContactInfo = valueOfContactInfo
  }

  updateContactInfo(parameter, newValue) {
    try {
      switch (parameter) {
        case "typeOfContactInfo":
          if (typeof newValue != 'string') {
            throw new ValidationError ("typeOfContactInfo should be string") 
          }
          this.typeOfContactInfo = newValue
          return this;
        case "valueOfContactInfo":
          if (typeof newValue != 'number') {
            throw new ValidationError ("valueOfContactInfo should be number") 
          }
          this.valueOfContactInfo = newValue
          return this;
        default:
          return "Invalid Parameter"
      }

    } catch (error) {
      console.log(error);
    }

  }
}

module.exports = ContactInfo
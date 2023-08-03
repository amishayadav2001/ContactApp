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
            return "typeOfContactInfo should be string" //if typeOfContactInfo is name
          }
          this.typeOfContactInfo = newValue
          return this;
        case "valueOfContactInfo":
          if (typeof newValue != 'number') {
            return "valueOfContactInfo should be number" //if valueOfContactInfo is phone number
          }
          this.valueOfContactInfo = newValue
          return this;
        default:
          return "Invalid Parameter"
      }

    } catch (error) {
      throw error
    }

  }
}

module.exports = ContactInfo
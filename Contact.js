const ContactInfo = require("./ContactInfo")
const NotFoundError = require("./Error/NotFoundError")
const ValidationError = require("./Error/ValidationError")


class Contact {
    static ID = 0
    constructor(contactName, country) {
        this.ID = Contact.ID++
        this.contactName = contactName
        this.country = country
        this.contactInfo = []
    }

    updateContact(parameter, newValue) {
        try {
            switch (parameter) {
                case "contactName":
                    if (typeof newValue != "string") {
                        throw new ValidationError ("Invalid new contactname")
                    }
                    this.contactName = newValue
                    return this
                case "country":
                    if (typeof newValue != "string") {
                        throw new ValidationError ("Invalid country name")
                    }
                    this.country = newValue
                    return this

                default: return "Invalid parameter"
            }

        } catch (error) {
            console.log(error);
        }
    }

    createContactInfo(typeOfContactInfo, valueOfContactInfo) {
        let contactInfoCreated = new contactInfo(typeOfContactInfo, valueOfContactInfo)
        this.contactsInfo.push(contactInfoCreated)
        return contactInfoCreated
    }

    getContactInfo() {
        return this.contactInfo
    }
    findContactInfo(contactInfoID) {
        try {
            for (let index = 0; index < this.contactInfo.length; index++) {
                if (this.contactInfo[index].ID == contactInfoID) {
                    return index
                }
            }
            throw new NotFoundError("contact info ID not found")

        } catch (error) {
            throw error
        }
    }
    updateContactInfo(contactInfoID, parameter, newValue) {
        try {
            if (typeof contactInfoID != 'number') {
                throw new ValidationError("contactInfoID should be number")
            }
            let indexOfContactInfo = this.findContactInfo(contactInfoID)
            return this.contactInfo[indexOfContactInfo].updateContactInfo(parameter, newValue)

        } catch (error) {
            console.log(error);
        }

    }


    deleteContactInfo(contactInfoID) {
        try {
            if (typeof contactInfoID != 'number') {
                throw new ValidationError("contactInfoID should be number")
            }

            let indexOfContactInfo = this.findContactInfo(contactInfoID)

            this.contactInfo.splice(indexOfContactInfo, 1)
            return this.contactInfo

        } catch (error) {
            console.log(error);
        }
    }
    getContactInfoById(contactInfoID) {
        try{
            if (typeof contactInfoID != 'number') {
                throw new ValidationError("contactInfoID should be number")
            }
            let indexOfContactInfo = this.findContactInfo(contactInfoID)
           
            return this.contactInfo[indexOfContactInfo]

        }catch(error){
            console.log(error);
        }
        
    }
}

module.exports = Contact
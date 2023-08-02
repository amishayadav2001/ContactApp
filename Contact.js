const ContactInfo = require("./ContactInfo")

class Contact{
    static ID =0
    constructor(contactName, country){
        this.ID = Contact.ID++
        this.contactName = contactName
        this.country = country
        this.contactInfos = []
    }
    
    updateContact( parameter, newValue){
    // if (typeof contactID!= 'number'){ return "Invalid contactID"}
    // let [indexOfContact, isContactExist] = this.findContact(contactID)
    // if (!isContactExist) { return "Contact Does not Exist"}
    // return this.contacts[indexOfContact].updateContact(parameter, newValue)
    switch(parameter){
        case "contactName":
            if (typeof newValue !== "string") {
                return "Invalid new contactname"}
                this.contactName = newValue
                return this  
        case "country":
            if (typeof newValue !== "string") {
                return "Invalid country name"}
                this.country = newValue
                return this
            
        default: return "Invalid parameter"
    }
}

createContactInfo(typeOfContactInfo, valueOfContactInfo){
    let contactInfoObj = new contactInfo(typeOfContactInfo, valueOfContactInfo)
    this.contactsInfos.push(contactInfoObj)
    return contactInfoObj 
}

getContactInfo(){
    return this.contactInfos
}
findContactInfo(contactID){
    for (let index = 0; index < this.contactInfos.length; index++){
        if(this.contactInfos[index].ID == contactID) {
            return [index, true]
        }
    }
    return[-1,false]
}
updateContactInfos(contactID,parameter,newValue){
    if(this.Admin){ 
        return "Does not have access"}
    if(typeof contactID != 'number'){
        return "contactID should be number"
    }
    let[indexOfContact,isContactInfoExist] = this.findContactInfo(contactID)
    if(!isContactInfoExist){
        return "Contact does not exist"
    }
    return this.contactInfos[indexOfContact].updateContactInfo(parameter,newValue)
}
deleteContactInfo(contactID){
    
    let[indexOfContact, isContactExist] = this.findContactInfo(contactID)
    if(!isContactExist){
        return "Contact does not exist"
    }
    this.contactInfos.splice(indexOfContact,1)
    return Contact.contactInfos
}
getContactInfoById(ID){
    let [indexOfUser, isContactInfoExist] = this.findContactInfo(ID)
    if(!isContactInfoExist){
        return "Contact does not exist"
    }
    return this.contactInfos[indexOfUser]
}
}

module.exports = Contact
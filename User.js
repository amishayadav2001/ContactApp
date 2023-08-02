const Contact = require("./Contact")
const ContactInfo = require("./ContactInfo")

class User{
    static allUsers = []
    static ID = 0
    constructor(fullName, isAdmin, gender, age){
        this.ID = User.ID++
        this.fullName = fullName
        this.gender = gender
        this.age = age
        this.isAdmin = isAdmin
        this.contacts = []
    }
    newUser(fullName, gender, age){
        if(typeof fullName!== 'string'){ return "name should be string"}
        if(typeof gender!== 'string'){ return "gender should be string"}
        if(typeof age!== 'number'){ return "age should be a number"}
        if (!this.isAdmin){ return " Does Not have access"}
        let userObj = new User(fullName, false, gender, age)
        User.allUsers.push(userObj)
        return userObj
    }

    static newAdmin(fullName, gender, age){
        if (typeof fullName!== 'string'){ return "name should be string"}
        if(typeof gender!== 'string'){ return "gender should be string"}
        if(typeof age!== 'number'){ return "age should be a number"}
        return new User(fullName, true, gender, age)
    }

    getAllUsers(){
        if (!this.isAdmin){return " Does Not have access"}
        return User.allUsers
    }
    static findUser(ID){
        for (let index = 0; index<User.allUsers.length; index++){
            if(ID == User.allUsers[index].ID){
                return [index, true]
            }
        }
        return [-1, false]
    }

    updateUser(userID, parameter, newValue){
        if (typeof userID!== 'number'){return "userID should be number"}
        if (!this.isAdmin) {return "Does not have access"}
        let [indexOfUser, isUserExist] = User.findUser(ID)
        if (!isUserExist) { return "User Not Found"}
        switch (parameter){
            case "fullName":
                if (typeof newValue !== "string") {
                    return "Name should be string"
                  }
                User.allUsers[indexOfUser].fullName = newValue
                return User.allUsers[indexOfUser]
            case "gender":
                if (typeof newValue !== "string") {
                    return "Gender should be string"
                  }
                User.allUsers[indexOfUser].gender = newValue
                return User.allUsers[indexOfUser] 
            case "age":
                if (typeof newValue !== "number" || newValue < 0) {
                    return "Age should be number"}
                User.allUsers[indexOfUser].age = newValue
                return User.allUsers[indexOfUser]
            default: return "Invalid parameter"
        }
    }

    deleteUser(ID){
        if (typeof ID!=='number'){return "ID should be number"}
        if (!this.isAdmin) {return "Does not have access"}
        let [indexOfUser, isUserExist] = User.findUser(ID)

        if (!isUserExist) {return "User does not exist"}

    User.allUsers.splice(indexOfUser, 1);
    return User.allUsers
  }

  createContact(contactName, country){
    if (typeof contactName!== 'string'){ return "name should be string"}
    if (this.isAdmin){ return "Admin cannot create contacts"}
    let contactObj = new Contact(contactName, country)
    this.contacts.push(contactObj)
    return contactObj
  }

  getAllContact(){
    if(this.isAdmin){ return "Admin does not have contacts"}
    return this.contacts
  }

  findContact(contactID){
    for(let index=0; index<this.contacts.length; index++){
        if(this.contacts[index].ID == contactID){
            return [index,true]
        }
    }
    return [-1, false]
  }

  updateContact(contactID, parameter, newValue){ //143
    if(this.admin) { return "Doest not have access"}
    if (typeof contactID!== 'number'){ return "contactID should be number" }
    let [indexOfContact, isContactExist] = this.findContact(contactID)
    if (!isContactExist) { return "Contact Does not Exist"}
    return this.contacts[indexOfContact].updateContact(parameter, newValue)
  }
   //switch(parameter){
  //       case "contactName":
  //           if (typeof newValue !== "string") {
  //               return "Invalid new contactname";}
  //           this.contacts[indexOfContact].contactName = newValue  
  //           return this.contacts[indexOfContact]
  //       case "country":
  //           if (typeof newValue !== "string") {
  //                   return "Invalid country";}
  //           this.contacts[indexOfContact].country = newValue
  //           return this.contacts[indexOfContact]
  //       default: return "Invalid parameter"
  //   }
  // }

  deleteContact(contactID){
    if(typeof contactID!== 'number'){ return "ContactID should be number"}
    if (!this.isAdmin) {
        return "Does not have access"
      }
    let [indexOfContact, isContactExist] = this.findContact(contactID);
    if (!isContactExist) {
      return "Contact Does not Exist";
    }

    this.contacts.splice(indexOfContact, 1);
    return "User.contacts"
  }

  createContactInfo(contactID, typeOfContactInfo, valueOfContactInfo){
    if (typeof typeOfContactInfo !== "string" ) {
        return "Invalid type of contact info";
      }
      if (typeof valueOfContactInfo !== "string" ) {
        return "Invalid value of contact info";
      }
    if (this.isAdmin) { return "Admin cannot create Contacts"}
    let [indexOfContact, isContactExist] = this.findContact(contactID)
    if (!isContactExist) { return "contact does not exist"}
    
  //   this.contactInfo[typeOfContactInfo] = valueOfContactInfo;

  //   return this.contactInfo;
  // }
  return this.contacts[indexOfContact].createContactInfo(typeOfContactInfo, valueOfContactInfo)
    }

  getContactInfo(contactID){
    if(typeof contactID!== 'number'){ return "contactID should be number" }
    if (this.isAdmin){ return "Admin does not contact information"}
    let[indexOfContact, isContactExist] = this.findContact(contactID)
    if(!isContactExist){ return "contact does not exist"}
    return this.contacts[indexOfContact].getContactInfo()
  }

  updateContactInfo(contactID, parameter, newValue){
    if(this.admin) { return "Doest not have access"}
    if(typeof contactID!= 'number'){return "contactID should be number"}
    let[indexOfContact, isContactExist] = this.findContact(contactID)
    if(!isContactExist){ 
      return "contact does not exist"
    }
    return this.contacts[indexOfContact].updateContactInfos(contactID, parameter, newValue)
  }

  deleteContactInfo(contactID){
    if (this.Admin){
      return "Admin does not have access to delete the contact"
    }
    if (typeof contactID!== 'number'){
      return "contactID should be number"
    }
    let[indexOfContact, isContactExist] = this.findContact(contactID)
    if (!isContactExist){
      return this.contacts[indexOfContact].deleteContactInfos(contactID)
    }
  }

  getUserById(ID) {
    if (!this.isAdmin) {
        return "Does not have access"
    }
    if (typeof userID !== 'number') {
        return "userID should be number"
    }
    let [indexOfUser, isUserExist] = User.findUser(ID)
    if(!isUserExist){
        return "User does not exist"
    }
    return User.allUsers[indexOfUser]
}

getContactById(ID) {
  if (this.isAdmin) {
      return "Does not have access"
  }
  if (typeof contactID !== 'number') {
      return "contactID should be number"
  }
  let [indexOfUser, isContactExist] = this.findContact(ID)
  if(!isContactExist){
      return "Contact does not exist"
  }
  return this.contacts[indexOfUser]
}

getContactInfoById(ID){
  if (this.isAdmin) {
      return "Does not have access"
  }
  if (typeof contactID !== 'number') {
      return "contactID should be number"
  }
  let [indexOfUser, isContactExist] = this.findContact(ID)
  if(!isContactExist){
      return "Contact does not exist"
  }
  return this.contacts[indexOfUser].getContactInfoById(ID)
}
}

let admin = User.newAdmin("Amisha Yadav", "Female", 21)
console.log(admin)

let user1 = admin.newUser("Suraj Dubey", "Male", 27)
let user2 = admin.newUser("Akash Yadav", "Male", 25)
let user3 = admin.newUser("Nikhil Mishra", "Male", 21)

console.log(user1)
console.log(user2)
console.log(user3)

console.log(user1.createContact("Amisha Yadav", "Japan"))
console.log(user1.createContact("Suraj Dubey", "India"))
console.log(user1.createContactInfo("Amisha Yadav", 8369033866 ))

console.log(user1.getContactInfo(1))
console.log(user1.updateContactInfo(0,"fullName","Amisha Yadav"))
console.log(user1.contacts[0].contactInfos)

console.log(admin.getAllUsers())

console.log(admin.getUserById(1))
console.log(user1.getContactById(0))
console.log(user1.getContactInfoById(1))

console.log(admin.findContact(1));
console.log(admin.getAllUsers(1));
console.log(admin.deleteUser(0));   
console.log(user1.getAllUsers(2));

// let contact1 = user1.createContact("Amisha Yadav");
// console.log(user1.getContactByID(1));


module.exports = User
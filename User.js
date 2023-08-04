const Contact = require("./Contact")
const NotFoundError = require("./Error/NotFoundError")
const UnAuthorizedError = require("./Error/UnAuthorizedError")
const ValidationError = require("./Error/ValidationError")

class User {
  static allUsers = []
  static ID = 0
  constructor(fullName, isAdmin, gender, age) {
    this.ID = User.ID++
    this.fullName = fullName
    this.gender = gender
    this.age = age
    this.isAdmin = isAdmin
    this.contacts = []
  }
  newUser(fullName, gender, age) {
    try {
      if (typeof fullName != 'string') { throw new ValidationError("name should be string") }
      if (typeof gender != 'string') { throw new ValidationError("gender should be string") }
      if (typeof age != 'number') { throw new ValidationError("age should be a number") }
      if (!this.isAdmin) { throw new UnAuthorizedError(" Does Not have access") }
      let userObj = new User(fullName, false, gender, age)
      User.allUsers.push(userObj)
      return userObj
    }
    catch (error) {
      console.log(error);
       
    }
  }

  static newAdmin(fullName, gender, age) {
    try {
      if (typeof fullName != 'string') { throw new ValidationError("name should be string") }
      if (typeof gender != 'string') { throw new ValidationError("gender should be string") }
      if (typeof age != 'number') { throw new ValidationError("age should be number") }
      return new User(fullName, true, gender, age)
    } catch (error) {
      console.log(error);
    }

  }

  getAllUsers() {
    try {
      if (!this.isAdmin) { return UnAuthorizedError(" Does Not have access") }
      return User.allUsers
    }
    catch (error) {
      console.log(error);
      
    }
  }

  static findUser(userID) {
    try {
      for (let index = 0; index < User.allUsers.length; index++) {
        if (userID == User.allUsers[index].ID) {
          return index
        }
      }
      throw new NotFoundError("user ID not found")
    } catch (error) {
      throw error
    }
  }

  updateUser(userID, parameter, newValue) {
    try {
      if (typeof userID != 'number') { throw new ValidationError("userID should be number") }
      if (!this.isAdmin) { throw new UnAuthorizedError("Does not have access") }
      let indexOfUser = User.findUser(userID)
      switch (parameter) {
        case "fullName":
          if (typeof newValue != "string") {
            throw new ValidationError("Name should be string")
          }
          User.allUsers[indexOfUser].fullName = newValue
          return User.allUsers[indexOfUser]
        case "gender":
          if (typeof newValue != "string") {
            throw new ValidationError("Gender should be string")
          }
          User.allUsers[indexOfUser].gender = newValue
          return User.allUsers[indexOfUser]
        case "age":
          if (typeof newValue != "number" || newValue < 0) {
            throw new ValidationError("Age should be number")
          }
          User.allUsers[indexOfUser].age = newValue
          return User.allUsers[indexOfUser]
        default: return "Invalid parameter"
      }
    } catch (error) {
      console.log(error);
      
    }
  }

  deleteUser(userID) {
    try {
      if (typeof ID != 'number') { throw new ValidationError("ID should be number") }
      if (!this.isAdmin) { throw new UnAuthorizedError("Does not have access") }
      let indexOfUser = User.findUser(userID)
      User.allUsers.splice(indexOfUser, 1);
      return User.allUsers
    } catch (error) {
      console.log(error);
      
    }
  }

  createContact(contactName, country) {
    try {
      if (typeof contactName != 'string') { throw new ValidationError("name should be string") }
      if (this.isAdmin) { throw new UnAuthorizedError("Admin cannot create contacts") }
      let createdContact = new Contact(contactName, country)
      this.contacts.push(createdContact)
      return createdContact
    } catch (error) {
      console.log(error); 
    }
  }

  getAllContact() {
    try {
      if (this.isAdmin) { throw new UnAuthorizedError("Admin does not have contacts") }
      return this.contacts
    } catch (error) {
      console.log(error);
      
    }
  }

  findContact(contactID) {
    try {
      for (let index = 0; index < this.contacts.length; index++) {
        if (this.contacts[index].ID == contactID) {
          return index
        }
      } throw new NotFoundError("contact ID not found")

    } catch (error) {
      throw error
    }
  }

  updateContact(contactID, parameter, newValue) {
    try {
      if (this.isAdmin) { throw new UnAuthorizedError("Does not have access") }
      if (typeof contactID != 'number') { throw new ValidationError("contactID should be number") }
      let indexOfContact = this.findContact(contactID)
      return this.contacts[indexOfContact].updateContact(parameter, newValue)

    } catch (error) {
      console.log(error); 
    }

  }

  deleteContact(contactID) {
    try {
      if (typeof contactID != 'number') { throw new ValidationError("ContactID should be number") }
      if (this.isAdmin) {
        throw new UnAuthorizedError("Does not have access")
      }
      let indexOfContact = this.findContact(contactID);
      this.contacts.splice(indexOfContact, 1);
      return "User.contacts"

    } catch (error) {
      console.log(error);
    }

  }

  createContactInfo(contactID, typeOfContactInfo, valueOfContactInfo) {
    try {
      if (typeof contactID != 'number') { throw new ValidationError("contactID should be number") }
      if (typeof typeOfContactInfo != "string") {
        throw new ValidationError("Invalid type of contact info")
      }
      if (typeof valueOfContactInfo != "number") {
        throw new ValidationError("Invalid value of contact info")
      }
      if (this.isAdmin) { throw new UnAuthorizedError("Admin cannot create Contacts") }
      let indexOfContact = this.findContact(contactID)
      return this.contacts[indexOfContact].createContactInfo(typeOfContactInfo, valueOfContactInfo)

    } catch (error) {
      console.log(error);
    }

  }

  getContactInfo(contactID) {
    try {
      if (typeof contactID != 'number') { throw new ValidationError("contactID should be number") }
      if (this.isAdmin) { throw new UnAuthorizedError("Admin does not have contact information") }
      let indexOfContact = this.findContact(contactID)
      return this.contacts[indexOfContact].getContactInfo()
    } catch (error) {
      console.log(error);
    }
  }

  updateContactInfo(contactID, contactInfoID, parameter, newValue) {
    try {
      if (this.isAdmin) { throw new UnAuthorizedError("Doest not have access") }
      if (typeof contactID != 'number') { throw new ValidationError("contactID should be number") }
      let indexOfContact = this.findContact(contactID)
      return this.contacts[indexOfContact].updateContactInfo(contactInfoID, parameter, newValue)

    } catch (error) {
      console.log(error);
    }
  }

  deleteContactInfo(contactID, contactInfoID) {
    try {
      if (this.isAdmin) {
        throw new UnAuthorizedError("Admin does not have access to delete the contact")
      }
      if (typeof contactID != 'number') {
        throw new ValidationError("contactID should be number")
      }
      let indexOfContact = this.findContact(contactID)
      return this.contacts[indexOfContact].deleteContactInfo(contactInfoID)

    } catch (error) {
      console.log(error);
    }
  }


  getUserById(userID) {
    try {
      if (!this.isAdmin) {
        throw new UnAuthorizedError("Does not have access")
      }
      if (typeof userID != 'number') {
        throw new ValidationError("userID should be number")
      }
      let indexOfUser = User.findUser(userID)
      return User.allUsers[indexOfUser]

    } catch (error) {
      console.log(error);
    }
  }

  getContactById(contactID) {
    try {
      if (this.isAdmin) {
        throw new UnAuthorizedError("Does not have access")
      }
      if (typeof contactID != 'number') {
        throw new ValidationError("contactID should be number")
      }
      let indexOfContact = this.findContact(contactID)
      return this.contacts[indexOfContact]

    } catch (error) {
      console.log(error);
    }
  }

  getContactInfoById(contactID, contactInfoID) {
    try {
      if (this.isAdmin) {
        throw new UnAuthorizedError("Does not have access")
      }
      if (typeof contactID != 'number') {
        throw new ValidationError("contactID should be number")
      }
      let indexOfContact = this.findContact(contactID)
      return this.contacts[indexOfContact].getContactInfoById(contactInfoID)
    } catch (error) {
      console.log(error);
    }
  }
}


let admin = User.newAdmin("Amisha Yadav", "Female", 21)
console.log(admin);

let user1 = admin.newUser("Akash Yadav","Male",25)
console.log(user1);
let user2 = admin.newUser("Shiv Yadav", "Male",50)
console.log(user2);
let user3 = admin.newUser("Shanti Yadav", "Female",40)
console.log(user3);

console.log("read user before updation: ");
console.log(admin.getAllUsers());

let updateuser3 = admin.updateUser(3, "fullName", "Nikhil Mishra")
console.log("read user after updation:");
console.log(admin.getAllUsers());

// let deleteuser3 = admin.deleteUser(3)
// console.log("read user after deletion:");
// console.log(admin.getAllUsers());

console.log("Create Contact:");
user1.createContact("Amisha Yadav", "India")
user1.createContact("Akash Yadav", "Australia")
user1.createContact("Suraj Dubey", "Japan")

console.log(user1.getAllContact());

console.log(user1.updateContact(2, "fullName", "Amisha")); 
console.log(user1.updateContact(2, "country", "USA")); 

console.log(user1.deleteContact(1));
console.log(user1.getAllContact());

// console.log(user1.createContactInfo(0, "Amisha Yadav", 8652809708));
// console.log(user1.createContactInfo(2, "Akash Yadav", 8369033866));

//console.log(user1.getAllContactInfo(0));

//console.log(user1.updateContactInfo(0,0,"typeOfContact","name"));
//console.log(user1.deleteContactInfo(0, 0));

//console.log(user1.getAllContactInfo(0));

console.log("Get user by ID:");
console.log(admin.getUserById(1));

console.log("Get contact by ID:");
console.log(user1.getContactById(0));

//console.log(user1.getContactInfoById(0, 0));

module.exports = User
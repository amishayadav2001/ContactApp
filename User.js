const Contact = require("./Contact")
const UnAuthorizedError = require("./UnAuthorizedError")
const NotFound = require("./NotFound")
const ValidationError = require("./ValidationError")

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
      throw error
    }
  }

  static newAdmin(fullName, gender, age) {
    try {
      if (typeof fullName != 'string') { throw new ValidationError("name should be string") }
      if (typeof gender != 'string') { throw new ValidationError("gender should be string") }
      if (typeof age != 'number') { throw new ValidationError("age should be number") }
      return new User(fullName, true, gender, age)
    } catch (error) {
      throw error
    }

  }

  getAllUsers() {
    try {
      if (!this.isAdmin) { return UnAuthorizedError(" Does Not have access") }
      return User.allUsers
    }
    catch (error) {
      throw error
    }
  }

  static findUser(ID) {
    try {
      for (let index = 0; index < User.allUsers.length; index++) {
        if (userID == User.allUsers[index].ID) {
          return index
        }
      }
      throw new NotFound("user ID not found")
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
      throw error
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
      throw error
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
      throw error
    }
  }

  getAllContact() {
    try {
      if (this.isAdmin) { throw new UnAuthorizedError("Admin does not have contacts") }
      return this.contacts
    } catch (error) {
      throw error
    }
  }

  findContact(contactID) {
    try {
      for (let index = 0; index < this.contacts.length; index++) {
        if (this.contacts[index].ID == contactID) {
          return index
        }
      } throw new NotFound("contact ID not found")

    } catch (error) {
      throw error
    }
  }

  updateContact(contactID, parameter, newValue) {
    try {
      if (this.isAdmin) { throw new UnAuthorizedError("Doest not have access") }
      if (typeof contactID != 'number') { throw new ValidationError("contactID should be number") }
      let indexOfContact = this.findContact(contactID)
      return this.contacts[indexOfContact].updateContact(parameter, newValue)

    } catch (error) {
      throw error
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
      throw error
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
      throw error
    }

  }

  getContactInfo(contactID) {
    try {
      if (typeof contactID != 'number') { throw new ValidationError("contactID should be number") }
      if (this.isAdmin) { throw new UnAuthorizedError("Admin does not have contact information") }
      let indexOfContact = this.findContact(contactID)
      return this.contacts[indexOfContact].getContactInfo()
    } catch (error) {
      throw error
    }
  }

  updateContactInfo(contactID, contactInfoID, parameter, newValue) {
    try {
      if (this.isAdmin) { throw new UnAuthorizedError("Doest not have access") }
      if (typeof contactID != 'number') { throw new ValidationError("contactID should be number") }
      let indexOfContact = this.findContact(contactID)
      return this.contacts[indexOfContact].updateContactInfo(contactInfoID, parameter, newValue)

    } catch (error) {
      throw error
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
      throw error
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
      throw error
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
      throw error
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
      throw error
    }
  }
}

let admin = User.newAdmin("Amisha", "Female", 21)
let user1 = admin.newUser("Akash", "Male", 25)
let user2 = user1.newUser("Suraj", "Male", 27)
console.log(admin);
console.log(user1);
console.log(user2);

console.log(admin.findUser("Amisha"));
let user3 = admin.newUser("Nikhil", "Male", 21)

user1.createContact("Amisha", "IND")
user1.createContact("Mummy","IND")

user1.createContact("Amisha", "IND")
console.log(user1.getAllContact());

user1.createContactInfo(0, "mobile", 8369033866)
user1.createContactInfo(0, "name", "Amisha" )
console.log(user1.getAllContact());
console.log(user1.getAllContactInfo(0));
console.log(admin.getUserById(1));
console.log(user1.getContactById(0));
console.log(user1.getContactInfoById(0,0));
console.log(user1.getAllContactInfo(0));
console.log("-------------------------");
console.log(user1.updateContactInfo(0, 0, 9221211972));
console.log(user1.getAllContactInfo(0));
user1.updateContact(0, "Yadav")
user1.deleteContact(2)

console.log(admin.getAllUsers());
console.log(user1.getAllContact());

admin.updateUser(2, "fullName", "Amisha Yadav")
console.log(admin.getAllUsers());

user1.updateContact(0, "Akash")
console.log(user1.getAllContact());

// let admin = User.newAdmin("Amisha Yadav", "Female", 21)
// console.log(admin)

// let user1 = admin.newUser("Suraj Dubey", "Male", 27)
// let user2 = admin.newUser("Akash Yadav", "Male", 25)
// let user3 = admin.newUser("Nikhil Mishra", "Male", 21)

// console.log(user1)
// console.log(user2)
// console.log(user3)

// console.log(user1.createContact("Amisha Yadav", "Japan"))
// console.log(user1.createContact("Suraj Dubey", "India"))
// console.log(user1.createContactInfo("Amisha Yadav", 8369033866))

// console.log(user1.getContactInfo(1))
// console.log(user1.updateContactInfo(0, "fullName", "Amisha Yadav"))
// console.log(user1.contacts[0].contactInfos)

// console.log(admin.getAllUsers())

// console.log(admin.getUserById(1))
// console.log(user1.getContactById(0))
// console.log(user1.getContactInfoById(1))

// console.log(admin.findContact(1));
// console.log(admin.getAllUsers(1));
// console.log(admin.deleteUser(0));
// console.log(user1.getAllUsers(2));

// // let contact1 = user1.createContact("Amisha Yadav");
// // console.log(user1.getContactByID(1));


module.exports = User
const { v4: uuidv4 } = require('uuid');

const roles = {
  BUYER: "buyer",
  SELLER: "seller",
}

Object.freeze(roles);

class User {
  constructor(id = uuidv4(), activeRole = roles.BUYER, name, messages = []){
    this.id = id
    this.activeRole = activeRole
    this.name = name
    this.messages = messages
  }

  //message göndermeye bakılacak
  sendMessage(user, job, content){
    const message = {
      job,
      content
    }

    this.messages.push(message)
    user.messages.push(message)
  }

  changeRole(){
    switch (this.activeRole) {
      case 'buyer':
        this.activeRole = roles.SELLER
        break
      case 'seller':
        this.activeRole = roles.BUYER
        break
    }

     console.log(`The active role for ${this.name} is ${this.activeRole} now`)
  }

  static create({id, activeRole, name, messages}) {
    return new User(id, activeRole, name, messages)
  }
}

module.exports = { User, roles }
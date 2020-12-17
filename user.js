const roles = {
  BUYER: "buyer",
  SELLER: "seller",
}

Object.freeze(roles);

class User {
  constructor(id, activeRole, name){
    this.id = id
    this.activeRole = activeRole
    this.name = name
    this.messages = []
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
}

module.exports = { User, roles }
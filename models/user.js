const { v4: uuidv4 } = require('uuid');

const roles = {
  EMPLOYER: "employer",
  FREELANCER: "freelancer",
}

Object.freeze(roles);

class User {
  constructor(id = uuidv4(), activeRole = roles.EMPLOYER, name, messages = []){
    this.id = id
    this.activeRole = activeRole
    this.name = name
    this.messages = messages
  }

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
      case 'employer':
        this.activeRole = roles.FREELANCER
        break
      case 'freelancer':
        this.activeRole = roles.EMPLOYER
        break
    }

     return `The active role for ${this.name} is ${this.activeRole} now`
  }

  static create({id, activeRole, name, messages}) {
    return new User(id, activeRole, name, messages)
  }
}

module.exports = { User, roles }
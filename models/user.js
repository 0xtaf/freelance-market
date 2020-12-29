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

  async sendMessage(user, job, content){
    const userDatabase = require('../database/user-database')

    const message = {
      job,
      content
    }

    this.messages.push(message)
    user.messages.push(message)
    await userDatabase.update(this)
    await userDatabase.update(user)
  }

  async changeRole(){
    const userDatabase = require('../database/user-database')
    const freelancerDatabase = require('../database/freelancer-database')
    const employerDatabase = require('../database/employer-database')
    
    switch (this.activeRole) {
      case 'employer':
        this.activeRole = roles.FREELANCER
        await userDatabase.update(this)
        await freelancerDatabase.update(this)
        await employerDatabase.update(this)
        break
      case 'freelancer':
        this.activeRole = roles.EMPLOYER
        await userDatabase.update(this)
        await freelancerDatabase.update(this)
        await employerDatabase.update(this)
        break
    }

     console.log(`The active role for ${this.name} is ${this.activeRole} now`)
  }

  static create({id, activeRole, name, messages}) {
    return new User(id, activeRole, name, messages)
  }
}

module.exports = { User, roles }
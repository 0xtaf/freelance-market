class BaseService {
  constructor(model) {
    this.model = model
  }

  load() {
    return this.model.find()
  }

  async insert(object) {
    return this.model.create(object)
  }

  async removeBy(property, value) {
    return this.model.deleteOne({ [property]: value })
  }

  async update(id, object) {
    return this.model.findByIdAndUpdate(id, object, { new: true })
  }

  async query(keyword) {
    return this.model.find({ title: { $regex: keyword, $options: 'i' } })
  }

  async find(id) {
    return this.model.findById(id)
  }

  async findBy(property, value) {
    return this.model.find({ [property]: value })
  }
}

module.exports = BaseService

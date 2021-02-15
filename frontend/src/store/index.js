import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'

Vue.use(Vuex)

export default new Vuex.Store({
  state: { count: 4 },
  actions: {
    async createFreelancer(ctx, { name, country, description, specialties }) {
      const request = await axios.post('/freelancers', {
        name,
        country,
        description,
        specialties
      })

      return request.data
    },
    async fetchFreelancers() {
      const request = await axios.get('/freelancers')

      return request.data
    },
    async fetchFreelancer(ctx, freelancerId) {
      const request = await axios.get(`/freelancers/${freelancerId}`)

      return request.data
    },
    async removeFreelancer(ctx, freelancerId) {
      const request = await axios.delete(`/freelancers/${freelancerId}`)

      return request.data
    },
    async createEmployer(ctx, name) {
      const request = await axios.post('/employers', {
        name
      })

      return request.data
    },
    async fetchEmployers() {
      const request = await axios.get('/employers')

      return request.data
    },
    async fetchEmployer(ctx, employerId) {
      const request = await axios.get(`/employers/${employerId}`)

      return request.data
    },
    async removeEmployer(ctx, employerId) {
      const request = await axios.delete(`/employers/${employerId}`)

      return request.data
    },
    async fetchJobs() {
      const request = await axios.get('/jobs')

      return request.data
    },
    async fetchJob(ctx, jobId) {
      const request = await axios.get(`/jobs/${jobId}`)

      return request.data
    },
    async fetchOrders() {
      const request = await axios.get('/orders')

      return request.data
    },
    async createJob(ctx, { freelancerId, title, content, price, deliveryTime }) {
      const request = await axios.post(`/freelancers/${freelancerId}/jobs`, {
        title,
        content,
        price,
        deliveryTime
      })

      return request.data
    },
    async addSpecialty(ctx, { freelancerId, field, experience }) {
      const request = await axios.post(`/freelancers/${freelancerId}/specialty`, {
        field,
        experience
      })

      return request.data
    },
    async updateBio(ctx, { freelancerId, country, description }) {
      const request = await axios.patch(`/freelancers/${freelancerId}`, {
        country,
        description
      })

      return request.data
    },
    async removeJob(ctx, { freelancerId, jobId }) {
      const request = await axios.delete(`/freelancers/${freelancerId}/jobs/${jobId}`)

      return request.data
    },
    async updateJob(ctx, { freelancerId, jobId, title, content, price, deliveryTime }) {
      const request = await axios.patch(`/freelancers/${freelancerId}/jobs/${jobId}`, {
        title,
        content,
        price,
        deliveryTime
      })

      return request.data
    },
    async changeStatus(ctx, { freelancerId, orderId, status }) {
      const request = await axios.patch(`/freelancers/${freelancerId}/orders/${orderId}/status`, {
        status
      })

      return request.data
    },
    async buy(ctx, { employerId, jobId }) {
      const request = await axios.post(`/employers/${employerId}/jobs/${jobId}`)

      return request.data
    },
    async comment(ctx, { employerId, jobId, text, rating }) {
      const request = await axios.post(`/employers/${employerId}/jobs/${jobId}/comments`, {
        rating,
        text
      })

      return request.data
    }
  },

  modules: {}
})

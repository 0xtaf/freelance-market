<script>
import { mapActions } from 'vuex'

export default {
  name: 'Freelancers',
  data() {
    return {
      freelancers: [],
      isLoading: true
    }
  },
  async mounted() {
    this.freelancers = await this.fetchFreelancers()
    this.isLoading = false
  },
  methods: {
    ...mapActions(['fetchFreelancers', 'createFreelancer', 'removeFreelancer']),
    async submitFreelancerForm({ name, country, description, field, experience }) {
      const specialties = { field, experience }

      await this.createFreelancer({ name, country, description, specialties })
      alert('Success!')

      this.name = null
      this.country = null
      this.description = null
      this.field = null
      this.experience = null

      this.freelancers = await this.fetchFreelancers()
    },
    async deleteFreelancer({ freelancerId }) {
      await this.removeFreelancer(freelancerId)
      alert('Success!')

      this.freelancers = await this.fetchFreelancers()
    }
  }
}
</script>

<template lang="pug">
.home
  form.bio(@submit.prevent='submitFreelancerForm({ name, country, description, field, experience })')
    h2 Create a new freelancer

    p Name
      input(v-model='name', placeholder='name')
    p Country
      input(v-model='country', placeholder='Turkey')
    p Description
      textarea(v-model='description', placeholder='description')
    h4 Specialty
    p Field
      input(v-model='field', placeholder='field')
    p Experience
      textarea(v-model='experience', placeholder='experience')
    input(type='submit')
  h1 Freelancers
  p(v-if='isLoading') Please wait...
  p(v-else) There are {{ freelancers.length }} freelancers in this platform.
    ol
      li(v-for='freelancer in freelancers')
        a(:href='`/freelancers/${freelancer._id}`') {{ freelancer.name }}
        button.deleteButton(@click='deleteFreelancer({ freelancerId: freelancer._id })') Delete
</template>

<style>
.deleteButton {
  margin-left: 20px;
}
</style>

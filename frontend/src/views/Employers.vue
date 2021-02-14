<script>
import { mapActions } from 'vuex'
export default {
  name: 'Employers',
  data() {
    return {
      employers: [],
      isLoading: true,
      employerName: null
    }
  },
  async mounted() {
    this.employers = await this.fetchEmployers()
    this.isLoading = false
  },
  methods: {
    ...mapActions(['fetchEmployers', 'createEmployer', 'removeEmployer']),
    async submitEmployerForm(employerName) {
      await this.createEmployer(employerName)
      alert('Success!')

      this.employerName = null

      this.employers = await this.fetchEmployers()
    },
    async deleteEmployer({ employerId }) {
      await this.removeEmployer(employerId)
      alert('Success!')

      this.employers = await this.fetchEmployers()
    }
  }
}
</script>

<template lang="pug">
.home
  form.bio(@submit.prevent='submitEmployerForm(employerName)')
    h2 Create a new employer

    p Name
      input(v-model='employerName', placeholder='name')
    input(type='submit')

  h1 Employers
  p(v-if='isLoading') Please wait...
  p(v-else) There are {{ employers.length }} employers in this plaform.
    ol
      li(v-for='employer in employers')
        a(:href='`/employers/${employer._id}`') {{ employer.name }}
        button.deleteButton(@click='deleteEmployer({ employerId: employer._id })') Delete
</template>

<style>
.deleteButton {
  margin-left: 20px;
}
</style>

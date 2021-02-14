<script>
import { mapActions } from 'vuex'
export default {
  name: 'Jobs',
  data() {
    return {
      jobs: [],
      isLoading: true
    }
  },
  async mounted() {
    this.jobs = await this.fetchJobs()
    this.isLoading = false
  },
  methods: {
    ...mapActions(['fetchJobs'])
  }
}
</script>

<template lang="pug">
.home
  h1 Jobs
  p(v-if='isLoading') Please wait...
  p(v-else) There are {{ jobs.length }} jobs in this plaform.
    ol
      li(v-for='job in jobs')
        a(:href='`/jobs/${job._id}`') {{ job.title }}
</template>

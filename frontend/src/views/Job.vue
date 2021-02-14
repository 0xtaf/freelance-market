<script>
import { mapActions } from 'vuex'
export default {
  name: 'Job',
  data() {
    return {
      job: {},
      isLoading: true,
      employers: []
    }
  },
  async mounted() {
    this.job = await this.fetchJob(this.$route.params.jobId)
    this.employers = await this.fetchEmployers()
    this.isLoading = false
  },
  methods: {
    ...mapActions(['fetchJob', 'fetchEmployers', 'buy']),
    async sendToBuy({ employerId }) {
      await this.buy({ employerId, jobId: this.$route.params.jobId })
      alert('Success!')
    }
  }
}
</script>

<template lang="pug">
.job
  h1(v-if='isLoading') Please Wait...
  div(v-else)
    h1 Job Details
    p {{ job.title }}

    em Title: {{ job.title }}
    br
    br
    em Content: {{ job.content }}
    br
    br
    em Price: {{ job.price }}
    br
    br
    em Delivery Time: {{ job.deliveryTime }}
    br
    br
    em Freelancer: &nbsp;
    div(v-if='job.freelancer')
      a(:href='`../../../freelancers/${job.freelancer._id}`') {{ job.freelancer.name }}
    p(v-else) This freelancer no longer exists

    h2 Comments
    div(v-if='job.comments.length')
      ol
        li(v-for='comment in job.comments')
          p Rating: {{ comment.rating }} - {{ comment.text }}
    p(v-else) The job does not have any comments yet.

    div(v-if='job.freelancer')
      h2 Buy as:
      p(v-if='isLoading') Please wait...
      ol
        li(v-for='employer in employers')
          a(:href='`/employers/${employer._id}`') {{ employer.name }}
          button(@click='sendToBuy({ employerId: employer._id })') Buy
</template>

<style>
button {
  margin-left: 20px;
}
</style>

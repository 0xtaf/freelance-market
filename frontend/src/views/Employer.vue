<script>
import { mapActions } from 'vuex'
export default {
  name: 'Employer',
  data() {
    return {
      employer: {},
      isLoading: true,
      isCommenting: false
    }
  },
  async mounted() {
    this.employer = await this.fetchEmployer(this.$route.params.employerId)
    console.log(this.employer)
    this.isLoading = false
  },
  methods: {
    ...mapActions(['fetchEmployer', 'buy', 'comment']),
    bringCommentForm(order) {
      this.text = null
      this.rating = null
      this.isCommenting = true
      this.jobId = order.job._id
    },
    closeCommentForm() {
      this.isCommenting = false
    },
    async submitComment() {
      await this.comment({
        employerId: this.$route.params.employerId,
        jobId: this.jobId,
        rating: this.rating,
        text: this.text
      })
      alert('Success!')
      this.closeCommentForm()
    }
  }
}
</script>

<template lang="pug">
.employer
  h1(v-if='isLoading') Please Wait...
  div(v-else)
    h1 Employer Detail
    p {{ employer.name }}

    h3 Bought Services:

    div(v-if='employer.orders.length')
      ol
        li(v-for='order in employer.orders')
          a(:href='`/jobs/${order.job._id}`') {{ order.job.title }}
          | &nbsp;from &nbsp;
          a(:href='`/freelancers/${order.job.freelancer._id}`') {{ order.job.freelancer.name }}
          button(@click='bringCommentForm(order)') Comment
        .form(v-show='isCommenting')
          h4 Comment
          form.bio(@submit.prevent='submitComment({ employerId: employer._id, jobId: rating, text })')
            label(for='rating') Rating:
            select#rating(v-model.number='rating', :disabled='!isCommenting', :class='{ view: !isCommenting }')
              option 5
              option 4
              option 3
              option 2
              option 1

            p Description:
              textarea(v-model='text', :disabled='!isCommenting', :class='{ view: !isCommenting }')
            input(type='submit')
        button(v-show='this.isCommenting', @click='closeCommentForm') Cancel

    p(v-else) {{ employer.name }} hasn't bought any services yet.
</template>

<style>
.view {
  border-color: transparent;
  background-color: initial;
  color: initial;
}
button {
  margin-left: 20px;
}
</style>

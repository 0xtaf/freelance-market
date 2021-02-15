<script>
import { mapActions } from 'vuex'
export default {
  name: 'Freelancer',
  data() {
    return {
      freelancer: {},
      isLoading: true,
      isEditingBio: false,
      isEditingJob: false
    }
  },
  async mounted() {
    this.freelancer = await this.fetchFreelancer(this.$route.params.freelancerId)
    this.isLoading = false
  },
  methods: {
    ...mapActions([
      'fetchFreelancer',
      'createJob',
      'addSpecialty',
      'updateBio',
      'removeJob',
      'updateJob',
      'changeStatus'
    ]),
    async submitJobForm({ freelancerId, title, content, price, deliveryTime }) {
      await this.createJob({ freelancerId, title, content, price, deliveryTime })

      this.freelancer = await this.fetchFreelancer(this.$route.params.freelancerId)

      this.title = null
      this.content = null
      this.price = null
      this.deliveryTime = null
    },
    async submitSpecialtyForm({ freelancerId, field, experience }) {
      await this.addSpecialty({ freelancerId, field, experience })

      this.freelancer = await this.fetchFreelancer(this.$route.params.freelancerId)

      this.field = null
      this.experience = null
    },
    editBio() {
      this.isEditingBio = !this.isEditingBio
    },
    editJob(job) {
      this.isEditingJob = true
      this.editTitle = job.title
      this.editContent = job.content
      this.editPrice = job.price
      this.editDeliveryTime = job.deliveryTime
      this.jobId = job._id
    },
    cancelJobEdit() {
      this.isEditingJob = false
    },
    async submitUpdateBio({ freelancerId, country, description }) {
      await this.updateBio({ freelancerId, country, description })

      this.freelancer = await this.fetchFreelancer(this.$route.params.freelancerId)
      this.editBio()
    },
    async deleteJob({ freelancerId, jobId }) {
      await this.removeJob({ freelancerId, jobId })

      this.freelancer = await this.fetchFreelancer(this.$route.params.freelancerId)
    },
    async submitUpdateJob({ freelancerId, jobId, title, content, price, deliveryTime }) {
      await this.updateJob({
        freelancerId,
        jobId,
        title,
        content,
        price,
        deliveryTime
      })

      this.freelancer = await this.fetchFreelancer(this.$route.params.freelancerId)
      this.cancelJobEdit()
    },
    async changeOrderStatus({ orderId }) {
      await this.changeStatus({ freelancerId: this.$route.params.freelancerId, orderId, status: this.status })
      if (!this.status) return alert('Select a status!')
      this.status = null
      this.freelancer = await this.fetchFreelancer(this.$route.params.freelancerId)
    }
  }
}
</script>

<template lang="pug">
.freelancer
  h1(v-if='isLoading') Please Wait...
  div(v-else)
    h1 Freelancer Detail
    p {{ freelancer.name }}
    h3 Country: {{ freelancer.country }}
    h3 Description:
    p {{ freelancer.description }}

    .form(v-show='isEditingBio')
      h4 Update Bio
      form.bio(@submit.prevent='submitUpdateBio({ freelancerId: freelancer._id, country, description })')
        p Country
          input(v-model='country', type='text', :disabled='!isEditingBio', :class='{ view: !isEditingBio }')
        p Description:
          textarea(v-model='description', :disabled='!isEditingBio', :class='{ view: !isEditingBio }')
        input(type='submit')
    button(v-show='this.isEditingBio', @click='editBio') Cancel

    button(v-show='!this.isEditingBio', @click='editBio') Edit Bio

    h3 Specialties

    div(v-if='freelancer.specialties.length')
      ol
        li(v-for='specialty in freelancer.specialties')
          | {{ specialty.field }}: {{ specialty.experience }}
    p(v-else) This person doesn't have any speacialties yet.
    h3 Add a specialty

    .form
      form.bio(@submit.prevent='submitSpecialtyForm({ freelancerId: freelancer._id, field, experience })')
        p Title
          input(v-model='field', placeholder='field')
        p Content
          textarea(v-model='experience', placeholder='experience')
        input(type='submit')
    h3 Jobs

    div(v-if='freelancer.jobs.length')
      ol
        li(v-for='job in freelancer.jobs')
          a(:href='`../jobs/${job._id}`') {{ job.title }}
          button.deleteButton(@click='deleteJob({ freelancerId: freelancer._id, jobId: job._id })') Delete
          button.updateButton(@click='editJob(job)') Update

        .form(v-show='isEditingJob')
          h4 Update Job
          form.bio(
            @submit.prevent='submitUpdateJob({ freelancerId: freelancer._id, jobId, title: editTitle, content: editContent, price: editPrice, deliveryTime: editDeliveryTime })'
          )
            p Title
              input(v-model='editTitle', type='text', :disabled='!isEditingJob', :class='{ view: !isEditingJob }')
            p Content:
              textarea(v-model='editContent', :disabled='!isEditingJob', :class='{ view: !isEditingJob }')
            p Price
              input(v-model='editPrice', type='text', :disabled='!isEditingJob', :class='{ view: !isEditingJob }')
            p Delivery Time
              input(
                v-model='editDeliveryTime',
                type='text',
                :disabled='!isEditingJob',
                :class='{ view: !isEditingJob }'
              )
            input(type='submit')

        button(v-show='this.isEditingJob', @click='cancelJobEdit') Cancel

    p(v-else) This person doesn't have any jobs yet.

    form.bio(@submit.prevent='submitJobForm({ freelancerId: freelancer._id, title, content, price, deliveryTime })')
      h2 Create new job

      p Title
        input(v-model='title', placeholder='title')
      p Content
        textarea(v-model='content', placeholder='content')
      p Price
        input(v-model='price', placeholder='30')
      p Delivery Time
        input(v-model='deliveryTime', placeholder='3')
      input(type='submit')

    h3 Orders

    .orders(v-if='freelancer.orders.length')
      ol
        li(v-for='order in freelancer.orders')
          a(:href='`../jobs/${order.job._id}`') {{ order.job.title }}
          |
          p Status: {{ order.status }}
          label(for='status')
            select#status(v-model.number='status', :value='Done')
              option(value=0) To do
              option(value=1) In Progress
              option(value=2) Done
              option(value=3) Canceled
          button(@click='changeOrderStatus({ orderId: order._id })') Update Status
          hr
    p(v-else) This person hasn't sold any jobs yet.
</template>

<style>
.view {
  border-color: transparent;
  background-color: initial;
  color: initial;
}

.bio {
  width: 400px;
  padding: 20px;
  margin: 10px;
  border: 1px solid #d8d8d8;
  display: inline-block;
}

.deleteButton,
label {
  margin-left: 20px;
}

input {
  width: 100%;
  height: 25px;
  margin-bottom: 20px;
}

textarea {
  width: 100%;
  height: 60px;
}

form {
  display: inline-block;
}

.orders > ol > li {
  margin-top: 20px;
}
</style>

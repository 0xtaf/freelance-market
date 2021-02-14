<script>
import { mapActions } from 'vuex'

export default {
  name: 'Orders',
  data() {
    return {
      orders: [],
      isLoading: true
    }
  },
  async mounted() {
    this.orders = await this.fetchOrders()
    this.isLoading = false
  },
  methods: {
    ...mapActions(['fetchOrders'])
  }
}
</script>

<template lang="pug">
.home
  h1 Orders
  p(v-if='isLoading') Please wait...
  p(v-else) There are {{ orders.length }} orders in this plaform.
    ol
      li(v-for='order in orders')
        p Job Title: {{ order.job.title }}
        p Status: {{ order.status }}
        b Date:
        | {{ order.date.toString() }}
</template>

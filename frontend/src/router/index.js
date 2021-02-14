import Vue from 'vue'
import VueRouter from 'vue-router'
import Freelancers from '../views/Freelancers.vue'
import Freelancer from '../views/Freelancer.vue'
import Employer from '../views/Employer.vue'
import Jobs from '../views/Jobs.vue'
import Job from '../views/Job.vue'
import Orders from '../views/Orders.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/freelancers',
    name: 'Freelancers',
    component: Freelancers
  },
  {
    path: '/freelancers/:freelancerId',
    name: 'Freelancer',
    component: Freelancer
  },
  {
    path: '/employers',
    name: 'Employers',
    // route level code-splitting
    // this generates a separate chunk (Employers.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Employers" */ '../views/Employers.vue')
  },
  {
    path: '/employers/:employerId',
    name: 'Employer',
    component: Employer
  },
  {
    path: '/jobs',
    name: 'Jobs',
    component: Jobs
  },
  {
    path: '/jobs/:jobId',
    name: 'Job',
    component: Job
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Orders
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

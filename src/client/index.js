import Vue from 'vue/dist/vue.esm.js'
import VueRouter from 'vue-router'
import App from './App'
import routes from './router'
import axios from 'axios'
import './style.css'

Vue.prototype.$axios = axios.create({
  baseURL: '/api',
  timeout: 1000,
})

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

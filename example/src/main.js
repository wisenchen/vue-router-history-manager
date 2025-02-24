import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueRouterHistoryManager from '../../dist'
import HomePage from './views/Home.vue'
import AboutPage from './views/About.vue'
import ContactPage from './views/Contact.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/about',
      name: 'about',
      component: AboutPage
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactPage
    }
  ]
})


Vue.use(VueRouterHistoryManager, { router })

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

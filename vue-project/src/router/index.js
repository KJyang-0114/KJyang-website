import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Videos from '@/views/Videos.vue'
import About from '@/views/About.vue'
import Contact from '@/views/Contact.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/lander',
      redirect: '/'
    },
    {
      path: '/videos',
      name: 'videos',
      component: Videos
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact
    }
  ]
})

export default router 
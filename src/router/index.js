import { createRouter, createWebHistory  } from 'vue-router'
import Home from '../views/Home.vue'
import Admin from '../views/Admin.vue'
// import SongEdit from '../components/SongList.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

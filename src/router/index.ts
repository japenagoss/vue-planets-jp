import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import PlanetListView from '@/views/PlanetListView.vue'
import PlanetDetail from '@/views/PlanetDetail.vue'
import HomeView from '@/views/HomeView.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/planets',
    name: 'planets',
    component: PlanetListView
  },
  {
    path: '/planet/:id',
    name: 'planet',
    component: PlanetDetail
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

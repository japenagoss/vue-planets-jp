import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import PlanetListView from '@/views/PlanetListView.vue'
import PlanetDetail from '@/views/PlanetDetail.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: (to) => {
      return { name: 'planets' }
    }
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

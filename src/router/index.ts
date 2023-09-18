import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import PlanetListView from "@/views/PlanetListView.vue"

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        redirect: to => { return { name: 'planets'}},
    },
    {
        path: "/planets",
        name: "planets",
        component: PlanetListView
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
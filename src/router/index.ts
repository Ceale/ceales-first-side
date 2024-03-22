import { createRouter, createWebHistory } from "vue-router"
import { inject } from "vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import("@p/index.vue")
    },
    {
      path: '/about',
      name: 'about',
      component: () => import("@p/about.vue")
    }
  ]
})

router.beforeEach((from, to, next) => inject("ShowSwitchAnimation").run(next, from, to))

export default router

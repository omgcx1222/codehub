import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
  {
    path: "/",
    redirect: "/moment"
  },
  {
    path: "/moment",
    component: () => import("@/views/moment/moment.vue")
  },
  {
    path: "/chat",
    component: () => import("@/views/chat/chat.vue")
  },
  {
    path: "/my",
    component: () => import("@/views/my/my.vue")
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

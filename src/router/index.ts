import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
  {
    path: "/",
    redirect: "/moment"
  },
  {
    path: "/moment",
    component: () => import("@/views/moment/moment.vue")
    // beforeEnter: (to, from) => {
    //   if(to.path === "/")
    //   return false
    // }
  },
  // {
  //   path: "/pubMoment",
  //   component: () => import("@/views/moment/children/pubMoment.vue"),
  //   meta: {
  //     tabbarHidden: true
  //   }
  // },
  {
    path: "/momentDetail",
    component: () => import("@/views/moment/children/momentDetail.vue"),
    meta: {
      tabbarHidden: true
    }
  },
  {
    path: "/chat",
    component: () => import("@/views/chat/chat.vue")
  },
  {
    path: "/my",
    component: () => import("@/views/my/my.vue")
  },
  {
    path: "/login",
    component: () => import("@/views/login/login.vue"),
    meta: {
      tabbarHidden: true
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

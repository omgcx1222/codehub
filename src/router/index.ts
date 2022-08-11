import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
  {
    path: "/",
    redirect: "/moment"
  },
  {
    path: "/moment",
    name: "moment",
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
    name: "momentDetail",
    component: () => import("@/views/moment/children/momentDetail.vue")
    // meta: {
    //   tabbarHidden: true
    // }
  },
  {
    path: "/chat",
    name: "chat",
    component: () => import("@/views/chat/chat.vue")
  },
  {
    path: "/chatDetail",
    name: "chatDetail",
    component: () => import("@/views/chat/components/chatDetail.vue")
  },
  {
    path: "/my",
    name: "my",
    component: () => import("@/views/my/my.vue")
  },
  {
    path: "/changeInfo",
    name: "changeInfo",
    component: () => import("@/views/my/children/changeInfo.vue")
  },
  {
    path: "/login",
    name: "login",
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

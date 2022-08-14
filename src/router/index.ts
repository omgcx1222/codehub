import { createRouter, createWebHashHistory } from "vue-router"
import { Dialog } from "vant"
import { getStorage } from "@/utils/localStorage"

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

router.beforeEach(async (to) => {
  if (to.path === "/changeInfo") {
    const userInfo = getStorage("userInfo")
    if (!userInfo?.id) {
      const res = await Dialog.confirm({ message: "未登录，是否前往登录页面？" })
      if (res) {
        return "login"
      }
      return false
    }
  }
  if (to.path === "/login") {
    const userInfo = getStorage("userInfo")
    if (userInfo?.token) {
      return false
    }
  }
})

router.onError(() => {
  router.go(-1)
})

export default router

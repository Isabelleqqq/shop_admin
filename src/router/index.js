import Vue from 'vue'
import Router from 'vue-router'
// @表示src的绝对路径
import Home from '@/components/home'
import Login from '@/components/login'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home
    }
  ]
})

// 给router对象注册导航守卫
router.beforeEach((to, from, next) => {
  // 如果去登陆，就放行
  if (to.path === '/login') {
    next()
    return
  }
  // 如果不是去登陆，先判断是否有token，如果有，放走
  // 如果没有转去登录
  let token = localStorage.getItem('token')
  if (token) {
    // 不拦截
    next()
  } else {
    // 跳转到登录
    next('/login')
  }
})
export default router

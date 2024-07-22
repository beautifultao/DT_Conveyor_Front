import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/userToken';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'unity',
      component: () => import('@/views/UnityView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();

  // 检查即将进入的路由是否需要认证
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 如果需要认证且用户未登录，则重定向到登录页面
    if (!userStore.isLoggedIn) {
      console.log('未登录，重定向到登录页面');
      next('/login');
    } else {
      console.log('已登录，继续导航');
      next();  // 如果已登录，继续导航
    }
  } else {
    next();  // 如果不需要认证，继续导航
  }
})

export default router

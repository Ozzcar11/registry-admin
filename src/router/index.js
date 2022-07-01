import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/index'

const routes = [
  {
    path: '/',
    meta: { layout: 'DefaultLayout', requireAuth: true },
    component: () => import('../views/requests/index')
  },
  {
    path: '/requests/:id',
    meta: { layout: 'DefaultLayout', requireAuth: true },
    component: () => import('../views/requests/_id')
  },
  {
    path: '/rejected/:id',
    meta: { layout: 'DefaultLayout', requireAuth: true },
    component: () => import('../views/rejected/_id')
  },
  {
    path: '/login',
    meta: { layout: 'EmptyLayout' },
    component: () => import('../views/login')
  },
  {
    path: '/rejected',
    meta: { layout: 'DefaultLayout', requireAuth: true },
    component: () => import('../views/rejected')
  },
  {
    path: '/accepted',
    meta: { layout: 'DefaultLayout', requireAuth: true },
    component: () => import('../views/accepted/index')
  },
  {
    path: '/accepted/:id',
    meta: { layout: 'DefaultLayout', requireAuth: true },
    component: () => import('../views/accepted/_id')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from) => {
  const isAuthenticated = store.getters['auth/isAuthenticated']

  if (to.meta.requireAuth && !isAuthenticated) {
    router.push('/login')
  }
})

export default router

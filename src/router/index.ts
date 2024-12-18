import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import AdminDashboard from '@/views/admin/AdminDashboard.vue'
import ResetPassword from '@/views/ResetPassword.vue'
import ForgotPassword from '@/views/ForgotPassword.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    meta: { requiresAuth: true },
  },
  { path: '/login', name: 'Login', component: Login },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword,
  },
  {
    path: '/reset-password/:token',
    name: 'ResetPassword',
    component: ResetPassword,
  },
  {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true },
  },
]

routes.push({
  path: '/:pathMatch(.*)*',
  name: 'NotFound',
  component: HomeView,
})

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth && !token) {
    next({ path: '/login' })
  } else {
    next()
  }
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import Authorization from '@/views/Authorization.vue'
import Registration from '@/views/Registration.vue'
import Home from '@/views/Home.vue'
import Road from '@/views/Road.vue'
import Forecasts from '@/views/Forecasts.vue'
import Forgot from '@/views/Forgot.vue'

const routes = [
  {
    path: '/',
    redirect: '/login', // Перенаправляем с корня на страницу входа
  },
  {
    path: '/login',
    name: 'Login',
    component: Authorization,
  },
  {
    path: '/reg',
    name: 'Registration',
    component: Registration,
  },
  {
    path: '/forgot',
    name: 'Forgot',
    component: Forgot,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }, // Требует авторизации
  },
  {
    path: '/road/:id', // Динамический параметр `id`
    name: 'road', // Имя маршрута (для удобства)
    component: Road, // Компонент, который отобразится
    props: true, // Передавать параметр как props (опционально)
    meta: { requiresAuth: true }, // Требует авторизации
  },
  {
    path: '/forecasts/:id',
    name: 'Forecasts',
    component: Forecasts,
    props: true,
    meta: { requiresAuth: true }, // Требует авторизации
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// // Глобальный хук навигации для проверки авторизации
// router.beforeEach((to, from, next) => {
//   const isAuthenticated = false
//   //   localStorage.getItem('authToken') Или ваша логина проверки авторизации

//   if (to.meta.requiresAuth && !isAuthenticated) {
//     // Если маршрут требует авторизации, а пользователь не авторизован
//     next('/login')
//   } else if (to.path === '/login' && isAuthenticated) {
//     // Если пользователь авторизован и пытается попасть на страницу входа
//     next('/home') // Перенаправляем на главную страницу после входа
//   } else {
//     // В остальных случаях разрешаем переход
//     next()
//   }
// })

export default router

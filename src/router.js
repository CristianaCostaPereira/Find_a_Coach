import { createRouter, createWebHistory } from 'vue-router'

import store from './store/index'

// const CoachDetail = () => import('./pages/coaches/CoachDetail.vue');

const router = createRouter ({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/coaches'
    },

    {
      path: '/coaches',
      name: 'coaches-list',
      component: () => import(/* webpackChunkName: "coaches-list" */ './pages/coaches/CoachesList')
    },

    {
      path: '/coaches/:id',
      name: 'coach',
      component: () => import(/* webpackChunkName: "coach-details" */ './pages/coaches/CoachDetail'),
      props: true,
      children: [
        {
          path: 'contact',
          name: 'coach-contact',
          component: () => import(/* webpackChunkName: "contact-coach" */ './pages/requests/ContactCoach')
        }
      ]
    },

    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "register" */ './pages/coaches/CoachRegistration'),
      meta: { requiresAuth: true }
    },

    {
      path: '/requests',
      name: 'requests',
      component: () => import(/* webpackChunkName: "requests" */ './pages/requests/RequestsReceived'),
      meta: { requiresAuth: true }
    },

    {
      path: '/auth',
      name: 'auth',
      component: () => import(/* webpackChunkName: "auth" */ './pages/auth/UserAuth'),
      meta: { requiresUnauth: true }
    },

    {
      path: '/:notFound(.*)',
      name: 'not-found',
      component: () => import(/* webpackChunkName: "not-found" */ './pages/NotFound'),
    }
  ]
})

// Global navigation guard creation
router.beforeEach(function (to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth')
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next('/coaches')
  } else {
    next()
  }
})

export default router
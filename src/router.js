import { createRouter, createWebHistory } from 'vue-router'

import CoachDetail from './pages/coaches/CoachDetail'
import CoachesList from './pages/coaches/CoachesList'
import CoachRegistration from './pages/coaches/CoachRegistration'
import ContactCoach from './pages/requests/ContactCoach'
import RequestsReceived from './pages/requests/RequestsReceived'
import NotFound from './pages/NotFound'
import UserAuth from './pages/auth/UserAuth'
import store from './store/index'

const router = createRouter ({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', name: 'coaches-list', component: CoachesList },
    {
      path: '/coaches/:id',
      name: 'coach',
      component: CoachDetail,
      props: true,
      children: [
        { path: 'contact', name: 'coach-contact', component: ContactCoach  }
      ]
    },
    { path: '/register', name: 'register', component: CoachRegistration, meta: {requiresAuth: true} },
    { path: '/requests', name: 'requests', component: RequestsReceived, meta: {requiresAuth: true} },
    { path: '/auth', name: 'auth', component: UserAuth, meta: {requiresUnauth: true} },
    { path: '/:notFound(.*)', name: 'not-found', component: NotFound }
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
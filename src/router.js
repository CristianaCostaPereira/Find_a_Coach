import { createRouter, createWebHistory } from 'vue-router'

import CoachDetail from './pages/coaches/CoachDetail'
import CoachesList from './pages/coaches/CoachesList'
import CoachRegistration from './pages/coaches/CoachRegistration'
import ContactCoach from './pages/requests/ContactCoach'
import RequestsReceived from './pages/requests/RequestsReceived'
import NotFound from './pages/NotFound'
import UserAuth from './pages/auth/UserAuth'

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
    { path: '/register', name: 'register', component: CoachRegistration },
    { path: '/requests', name: 'requests', component: RequestsReceived },
    { path: '/auth', name: 'auth', component: UserAuth },
    { path: '/:notFound(.*)', name: 'not-found', component: NotFound }
  ]
})

export default router
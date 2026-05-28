import { createRouter, createWebHistory } from 'vue-router'

import EkranZaRegistraciju from '@/views/EkranZaRegistraciju.vue'
import EkranZaPrijavu from '@/views/EkranZaPrijavu.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/registracija',
      name: 'registracija',
      component: EkranZaRegistraciju,
    },
    {
      path: '/',
      name: 'prijava',
      component: EkranZaPrijavu,
    },
  ],
})

export default router

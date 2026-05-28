import { createRouter, createWebHistory } from 'vue-router'

import EkranZaRegistraciju from '@/views/EkranZaRegistraciju.vue'
import EkranZaPrijavu from '@/views/EkranZaPrijavu.vue'
import EkranZaSastav from '@/views/EkranZaSastav.vue'
import EkranZaIgrace from '@/views/EkranZaIgrace.vue'
import EkranZaAnalitiku from '@/views/EkranZaAnalitiku.vue'
import EkranZaUtakmice from '@/views/EkranZaUtakmice.vue'
import EkranZaTreninge from '@/views/EkranZaTreninge.vue'

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
    {
      path: '/sastav',
      name: 'sastav',
      component: EkranZaSastav,
    },
    {
      path: '/igraci',
      name: 'igraci',
      component: EkranZaIgrace,
    },
    {
      path: '/analitika',
      name: 'analitika',
      component: EkranZaAnalitiku,
    },
    {
      path: '/utakmice',
      name: 'utakmice',
      component: EkranZaUtakmice,
    },
    {
      path: '/treninzi',
      name: 'treninzi',
      component: EkranZaTreninge,
    },
  ],
})

import { useAuthStore } from '@/stores/auth'

router.beforeEach((to) => {
  const authStore = useAuthStore()

  if (to.path === '/sastav' && !authStore.user) {
    return '/'
  }
})

export default router

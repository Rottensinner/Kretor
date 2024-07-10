import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreatorView from '../views/CreatorView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Kreator',
      component: CreatorView
    },
    {
      path: '/Ekwipunkek',
      name: 'Ekwipunkek',
      component: HomeView
    },
    {
      path: '/zaklecia',
      name: 'Zaklęcia',
      component: HomeView
    }

  ]
})

export default router

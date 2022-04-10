import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: () => import('../views/home.vue')
  },
  {
    path: '/message',
    name: 'MessageView',
    component: () => import('../views/message.vue')
  },
  {
    path: '/profil',
    name: 'ProfilView',
    component: () => import('../views/profil.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

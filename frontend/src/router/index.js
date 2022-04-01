import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/LoginView',
    name: 'LoginView',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/SignupView',
    name: 'SignupView',
    component: () => import('../views/SignupView.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

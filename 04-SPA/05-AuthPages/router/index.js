import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: 'history',
  base: '/04-SPA/05-AuthPages',
  routes: [
    {
      path: '/',
      component: () => import('../views/IndexPage'),
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('../views/LoginPage'),
    },
    {
      name: 'register',
      path: '/register',
      component: () => import('../views/RegisterPage'),
    },
  ],
});

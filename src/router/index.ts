import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/own',
    component: () => import('@/views/own/index.vue')
  },
  {
    path: '/playListDetail/:id',
    component: () => import('@/views/playList/index.vue'),
    props: route => ({
      id: route.params.id
    })
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;

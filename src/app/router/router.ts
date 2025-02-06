import { createRouter, createWebHistory } from 'vue-router';

import { MainPage } from '@pages/main';

import { ROUTE } from '@shared/config';

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: ROUTE.HOME,
      component: MainPage
    }
  ]
});

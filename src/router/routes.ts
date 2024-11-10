import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/PasswordPage.vue') }],
  },
  {
    path: '/number',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/NumberPage.vue') }],
  },
  {
    path: '/hash',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/HashPage.vue') }],
  },
  {
    path: '/styler',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/StylerPage.vue') }],
  },
  {
    path: '/wallet',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/WalletPage.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;

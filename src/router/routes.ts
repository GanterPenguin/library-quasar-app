import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        redirect: 'library-list',
      },
      {
        path: 'library-list',
        component: () => import('pages/LibraryList.vue'),
        children: [
          {
            path: 'library/:id',
            component: () => import('pages/LibraryDetail.vue'),
          },
        ],
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;

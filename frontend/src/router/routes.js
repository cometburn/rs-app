const routes = [
  {
    path: '/',
    name: 'signin',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'login',
        component: () => import('pages/LoginPage.vue')
      }
    ]
  },
  {
    path: '/blogs',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'blogs',
        component: () => import('pages/blogs/IndexPage.vue'),
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
];

export default routes;

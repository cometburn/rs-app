
const routes = [
  {
    path: '/',
    name: 'signin',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'login',
        component: () => import('pages/LoginPage.vue'),
      }
    ]
  },
  {
    path: '/register',
    name: 'register-parent',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'register',
        component: () => import('pages/RegisterPage.vue'),
      }
    ]
  },
  {
    path: '/blogs',
    name: 'blogs',
    component: () => import('layouts/BlogLayout.vue'),
    children: [
      {
        path: '',
        name: 'blogs-child',
        component: () => import('pages/blogs/IndexPage.vue'),
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '/blogs/:id/preview',
    name: 'blog-preview',
    component: () => import('layouts/BlogLayout.vue'),
    children: [
      {
        path: '',
        name: 'blog-preview-child',
        component: () => import('pages/blogs/PreviewPage.vue'),
        props: true,
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

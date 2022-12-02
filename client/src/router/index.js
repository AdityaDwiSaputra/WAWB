import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    beforeEnter: preventAuthPage,
    component: HomeView
  },
  {
    path: '/login',
    component: () => import('../views/AuthView'),
    beforeEnter: preventAuthPage,
    children: [
        {
          name: 'Login',
          path: '',
          component: () => import('../views/pages/auth/LoginView')
        },
        {
          name: 'Register',
          path: '/register',
          component: () => import('../views/pages/auth/RegisterView')
        },
    ]
  },
  {
    path: '/',
    component: () => import('../views/IndexView'),
    beforeEnter: requireAuth,
    children: [
        {
          name: 'Dashboard',
          path: '/dashboard/:message?',
          component: () => import('../views/pages/dashboard/IndexDashboard'),
        },
        {
          name: 'User',
          path: '/user/:message?',
          component: () => import('../views/pages/users/UserIndex'),
        },
        {
          name: 'UserDetail',
          path: '/user-detail/:id',
          component: () => import('../views/pages/users/DetailUser'),
        },
        {
          name: 'CreateMahasiswa',
          path: '/user/create-mahasiswa',
          component: () => import('../views/pages/users/CreateMahasiswa'),
        },
        {
          name: 'EditMahasiswa',
          path: '/edit-mahasiswa/:id',
          component: () => import('../views/pages/users/EditMahasiswa'),
        },
        {
          name: 'CreateKemahasiswaan',
          path: '/user/create-kemahasiswaan',
          component: () => import('../views/pages/users/CreateKemahasiswaan'),
        },
        {
          name: 'EditKemahasiswaan',
          path: '/edit-kemahasiswaan/:id',
          component: () => import('../views/pages/users/EditKemahasiswaan'),
        },
        {
          name: 'CreateKesehatan',
          path: '/user/create-tenaga-kesehatan',
          component: () => import('../views/pages/users/CreateKesehatan'),
        },
        {
          name: 'EditKesehatan',
          path: '/edit-tenaga-kesehatan/:id',
          component: () => import('../views/pages/users/EditKesehatan'),
        },
        {
          name: 'CreateKegiatan',
          path: '/user/create-unit-kegiatan',
          component: () => import('../views/pages/users/CreateKegiatan'),
        },
        {
          name: 'EditKegiatan',
          path: '/edit-unit-kegiatan/:id',
          component: () => import('../views/pages/users/EditKegiatan'),
        },
        {
          name: 'Permohonan',
          path: '/permohonan/:message?',
          component: () => import('../views/pages/permohonan/PermohonanIndex'),
        },
        {
          name: 'DetailPermohonan',
          path: '/detail-permohonan/:id',
          component: () => import('../views/pages/permohonan/DetailPermohonan'),
        },
        {
          name: 'CreatePermohonan',
          path: '/permohonan/create',
          component: () => import('../views/pages/permohonan/CreatePermohonan'),
        },
        {
          name: 'EditPermohonan',
          path: '/edit-permohonan/:id',
          component: () => import('../views/pages/permohonan/EditPermohonan'),
        },
        {
          name: 'PenangananPermohonan',
          path: '/penanganan-permohonan/:id',
          component: () => import('../views/pages/permohonan/PenangananPermohonan'),
        },
        {
          name: 'Post',
          path: '/post/:message?',
          component: () => import('../views/pages/posts/PostIndex'),
        },
        {
          name: 'PostDetail',
          path: '/post-detail/:id',
          component: () => import('../views/pages/posts/DetailPost'),
        },
        {
          name: 'AddPost',
          path: '/post/create',
          component: () => import('../views/pages/posts/CreatePost'),
        },
        {
          name: 'EditPost',
          path: '/edit-post/:id/',
          component: () => import('../views/pages/posts/EditPost'),
        },
    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

function requireAuth(to, from, next) {
  if (window.$cookies.get('token')) next();
  else next({ name: "Home" });
}

function preventAuthPage(to, from, next) {
  if (!window.$cookies.get('token')) next();
  else next({ name: "Dashboard" });
}

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router



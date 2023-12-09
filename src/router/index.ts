import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ArticlesView from '@/views/ArticlesView.vue'
import CreateArticle from '@/views/CreateArticle.vue'
import EditView from '@/views/EditView.vue'
import RegisterView from '@/views/RegisterView.vue'

const DEFAULT_TITLE = 'Arvan'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Login',
        requiresAuth: false
      }
    },
    {
      path: '/articles',
      name: 'articles',
      component: ArticlesView,
      meta: {
        title: 'All Articles',
        requiresAuth: true
      }
    },
    {
      path: '/articles/create',
      name: 'create',
      component: CreateArticle,
      meta: {
        title: 'Create New Article',
        requiresAuth: true
      }
    },
    {
      path: '/articles/edit/:slug',
      name: 'edit',
      component: EditView,
      meta: {
        title: 'Edit Article',
        requiresAuth: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {
        title: 'Register',
        requiresAuth: false
      }
    }
  ]
})

// set title of each route
router.beforeEach((to) => {
  document.title = `${DEFAULT_TITLE} | ${to.meta.title}` || DEFAULT_TITLE
})

export default router

import { createRouter, createWebHistory } from 'vue-router'

// views
import HomeView from '@/views/HomeView.vue'
import ArticlesView from '@/views/ArticlesView.vue'
import CreateView from '@/views/CreateView.vue'
import EditView from '@/views/EditView.vue'
import RegisterView from '@/views/RegisterView.vue'
import NotFound from '@/views/NotFound.vue'
import ArticlesTable from '@/components/ArticlesTable.vue'

// fn
import getCurrentUser from '@/utils/getCurrentUser'

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
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {
        title: 'Register',
        requiresAuth: false
      }
    },
    {
      path: '/articles',
      name: 'articles',
      component: ArticlesView,
      children: [
        {
          path: '',
          name: 'articlesFirstPage',
          component: ArticlesTable,
          meta: {
            title: 'Articles',
            heading: 'All Posts',
            requiresAuth: true
          }
        },
        {
          path: 'page/:page',
          name: 'articlesPage',
          component: ArticlesTable,
          meta: {
            title: 'Articles',
            heading: 'All Posts',
            requiresAuth: true
          }
        },
        {
          path: 'create',
          name: 'create',
          component: CreateView,
          meta: {
            title: 'Create New Article',
            heading: 'New Article',
            requiresAuth: true
          }
        },
        {
          path: 'edit/:slug',
          name: 'edit',
          component: EditView,
          meta: {
            title: 'Edit Article',
            heading: 'Edit Article',
            requiresAuth: true
          }
        }
      ]
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
  ]
})

// set title of each route
router.beforeEach((to) => {
  document.title = `${DEFAULT_TITLE} | ${to.meta.title}` || DEFAULT_TITLE
})

// auth before going to each route
router.beforeEach(async (to) => {
  // authentication right in here
  const userData = await getCurrentUser()
  if (to.meta.requiresAuth) {
    if (userData.status === 'unauthorized' || !userData.data?.user) {
      // this route requires auth, check if logged in
      // if not, redirect to login page.
      return {
        path: '/'
      }
    }
  }
  // if already logged in user goes to login or register page, redirect to articles page
  if ((to.path === '/' || to.path === '/register') && userData.status === 'authorized') {
    return {
      path: '/articles'
    }
  }
})
export default router

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuth0 } from '@auth0/auth0-vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/gallery',
      name: 'Gallery',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Gallery.vue')
    },
    {
      path: '/top',
      name: 'Top Images',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/BestImages.vue')
    },
    {
      path: '/login',
      name: 'Login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Login.vue')
    },
    {
      path: '/profile',
      name: 'Profile',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Profile.vue')
    }
  ]
})

async function checkAuthAndContinue() {
  return new Promise((resolve, reject) => {
    console.log(useAuth0())
    const { user, isAuthenticated, isLoading } = useAuth0()
    let retryCount = 0

    const checkIfLoading = setInterval(() => {
      if (!isLoading.value && isAuthenticated.value) {
        clearInterval(checkIfLoading)
        console.log('got it')
        resolve(user)
      } else {
        retryCount++
        console.log('retrying!')

        if (retryCount >= 25) {
          clearInterval(checkIfLoading)
          reject(new Error('Authentication failed after maximum retries.'))
        }
      }
    }, 100)
  })
}

router.beforeEach(async () => {
  const { user, isAuthenticated, isLoading } = useAuth0()
  console.log('authenticated: ', isAuthenticated.value)
  console.log('user: ', user.value)
  try {
    // await checkAuthAndContinue()
    // Continue with the navigation
  } catch (error) {
    console.log(error.message)
    // Handle the authentication failure
  }
})

export default router

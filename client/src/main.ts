import './assets/main.css'
import './index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createAuth0 } from '@auth0/auth0-vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
const auth0 = createAuth0({
  domain: import.meta.env.VITE_AUTH_DOMAIN,
  clientId: import.meta.env.VITE_AUTH_CLIENT_ID,
  authorizationParams: {
    redirect_uri: window.location.origin
  }
})

app.use(createPinia())
app.use(auth0)
app.use(router)

app.mount('#app')

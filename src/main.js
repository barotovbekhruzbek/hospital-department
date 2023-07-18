
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'
import { store } from './store'
const app = createApp(App)

app.use(router)
app.use(store)
app.use(VueCookies,{expires:'10h'})
app.mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// TailwindCSS
import './index.css'

// Gestion API
import axios from 'axios'


// Gestion de FontAwesome
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHouse, faDoorOpen, faHammer } from '@fortawesome/free-solid-svg-icons'
// import { } from '@fortawesome/free-brands-svg-icons'

library.add(faHouse, faDoorOpen, faHammer)



createApp(App)
   .component('font-awesome-icon', FontAwesomeIcon)
   .use(router).use(store)
   .mount('#app')


// Gestion variable global

window.api = axios.create({
   baseURL: 'https://api.catif.me/tips-catif'
});

window.apiBase= axios.create({
   baseURL: 'https://api.catif.me/'
});
import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import './index.css'

// Gestion API
import axios from 'axios'


// Gestion de FontAwesome
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { } from '@fortawesome/free-brands-svg-icons'

library.add(faHome) // Font Awesome Solid
library.add() // Font Awesome Brands



createApp(App)
   .component('fa', FontAwesomeIcon)
   .use(router)
   .mount('#app')


// Gestion variable global

window.api = axios.create({
   baseURL: 'https://api.catif.me/tips-catif'
});

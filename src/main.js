import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import './index.css'

import axios from 'axios'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHouse, faHome } from '@fortawesome/free-solid-svg-icons'
import {} from '@fortawesome/free-brands-svg-icons'


window.api = axios.create({
    baseURL: 'https://62a21daacc8c0118ef5d4695.mockapi.io/'
});

library.add(faHouse, faHome) // Font Awesome Solid
library.add() // Font Awesome Brands

createApp(App)
.component('fa', FontAwesomeIcon)
.use(router).mount('#app')
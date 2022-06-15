import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store'


import Home from '@/views/Home.vue';
import Category from '@/views/Category.vue';
import Article from '@/views/Article.vue';

// Admin panel
import HomePanel from '@/views/admin/Home.vue';
import LoginPanel from '@/views/admin/Login.vue';
import CreateArticle from '@/views/admin/Create.vue';
import EditArticle from '@/views/admin/Edit.vue';

import NotFound from '@/views/NotFound.vue';

const routes = [
   {
      path: '/', component: Home,
      meta: { title: 'Accueil - Catif' }
   }, {
      path: '/category/:name', component: Category, name: 'Category',
      meta: { title: 'Liste des articles - Catif' }
   }, {
      path: '/article/:id', component: Article,
      meta: { title: 'Article - Catif' }
   }, {
      path: '/login', component: LoginPanel,
      meta: { title: 'Connexion - Catif' }
   },

   // Admin Panel
   {
      path: '/panel', component: HomePanel,
      meta: { title: 'Panel - Catif' }
   }, {
      path: '/panel/create', component: CreateArticle,
      meta: { title: 'Création d\'un article - Catif' }
   }, {
      path: '/panel/edit/:id', component: EditArticle,
      meta: { title: 'Modification d\'un article - Catif' }
   },



   {
      path: '/:pathMatch(.*)', component: NotFound,
      meta: {
         title: 'Page introuvable - Catif'
      }
   }
];



const router = createRouter({
   history: createWebHistory(),
   routes,
})

function isLogged() {
   if (!store.state.token) {
      return false;
   } else {
      return true;
   }
}

router.beforeEach((to, from, next) => {
   // si l'utilisateur veut accéder aux pages admins sans être connecté 
   if (!isLogged() && (to.name == 'panel' || to.name == 'panelMessage' || to.name == 'panelPacks' || to.name == 'panelDescriptions')) {
      // il est redirigé vers l'accueil
      next({ path: '/login' })
   } else if (isLogged() && (to.path == '/login')){
      next({ path: '/panel'})
   } else { next() } // sinon il est autorisé à accéder aux pages
})

export default router;
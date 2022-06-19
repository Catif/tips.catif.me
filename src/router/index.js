import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store'


import Home from '@/views/Home.vue';
import Category from '@/views/Category.vue';
import Article from '@/views/Article.vue';

// Admin panel
import HomePanel from '@/views/admin/Home.vue';
import LoginPanel from '@/views/admin/Login.vue';
import CreateArticle from '@/views/admin/Create.vue';
import ListEditArticle from '@/views/admin/List-Edit.vue';
import EditArticle from '@/views/admin/Edit.vue';

import NotFound from '@/views/NotFound.vue';

const routes = [
   {
      path: '/', component: Home,
      meta: { title: 'Accueil - Tips de Catif' }
   }, {
      path: '/category/:name', component: Category, name: 'Category',
      meta: { title: 'Liste des articles - Tips de Catif' }
   }, {
      path: '/article/:id', component: Article, name: 'Article',
      meta: { title: 'Article - Tips de Catif' }
   }, {
      path: '/login', component: LoginPanel,
      meta: { title: 'Connexion - Tips de Catif' }
   },

   // Admin Panel
   {
      path: '/panel', component: HomePanel, name:"HomePanel",
      meta: { title: 'Panel - Tips de Catif' }
   }, {
      path: '/panel/create', component: CreateArticle, name:"CreateArticle",
      meta: { title: 'Création d\'un article - Tips de Catif' }
   }, {
      path: '/panel/edit', component: ListEditArticle, name:"ListEditArticle",
      meta: { title: 'Liste des articles - Tips de Catif' }
   }, {
      path: '/panel/edit/:id', component: EditArticle, name:"EditArticle",
      meta: { title: 'Modification d\'un article - Tips de Catif' }
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
   if (!isLogged() && (to.name == 'HomePanel' || to.name == 'CreateArticle' || to.name == 'ListEditArticle' || to.name == 'EditArticle')) {
      // il est redirigé vers la page de connexion
      next({ path: '/login' })
   } else if (isLogged() && (to.path == '/login')){
      next({ path: '/panel'})
   } else { next() } // sinon il est autorisé à accéder aux pages

   document.title = to.meta.title
   document.querySelector('meta[name="keywords"]').setAttribute('content', 'tutoriel, tutorial, tips, niche, catif, article, technologie, france, projet, vuejs')
   document.querySelector('meta[name="description"]').setAttribute('content', 'Site dédié aux tutoriels informatique de niche.')
})

export default router;
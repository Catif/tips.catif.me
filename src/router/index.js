import { createRouter, createWebHistory} from 'vue-router';


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
        meta: {title: 'Accueil - Catif'}
    }, {
        path: '/category/:name', component: Category, 
        meta: {title: 'Accueil - Catif'}
    }, {
        path: '/article/:id', component: Article, 
        meta: {title: 'Accueil - Catif'}
    }, 
    
    // Admin Panel
        {
            path: '/panel', component: HomePanel, 
            meta: {title: 'Accueil - Catif'}
        }, {
            path: '/panel/login', component: LoginPanel, 
            meta: {title: 'Accueil - Catif'}
        }, {
            path: '/panel/create', component: CreateArticle, 
            meta: {title: 'Accueil - Catif'}
        }, {
            path: '/panel/edit/:id', component: EditArticle, 
            meta: {title: 'Accueil - Catif'}
        }, 
    
    
    
    {
        path: '/:pathMatch(.*)', component: NotFound,
        meta: {
            title: 'Error 404 - Catif'
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.afterEach((to) => {
    document.title = to.meta.title
    window.scrollTo({top: 0, behavior: 'smooth'})
})

export default router;
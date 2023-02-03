import { createRouter, createWebHistory } from 'vue-router'
import NotFound from "@/components/NotFound.vue";
import CreateCompte from "@/components/CreateCompte";
import gestionMembreCompte from "@/components/gestionMembreCompte";
import gestionDepense from "@/components/gestionDepense";

const routes = [
    { name: 'CreateCompte', path: '/', component: CreateCompte },
    { name : 'gestionMembreCompte' , path : '/gestionMembreCompte', component: gestionMembreCompte},
    { name : 'gestionMembreCompte' , path : '/gestionMembreCompte/:label', component: gestionMembreCompte},
    { name : 'gestionDepense' , path : '/gestionDepense', component: gestionDepense},
    { name : 'gestionDepense' , path : '/gestionDepense/:label', component: gestionDepense},



    //error404
    { name : 'NotFound' , path : '/:pathMatch(.*)*', component: NotFound},

]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router

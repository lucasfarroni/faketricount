import { createRouter, createWebHistory } from 'vue-router'
import NotFound from "@/components/NotFound.vue";
import CreateCompte from "@/components/CreateCompte";
import gestionMembreCompte from "@/components/gestionMembreCompte";
import gestionDepense from "@/components/gestionDepense";
import BalanceDepense from "@/components/BalanceDepense";
const routes = [
    { name: 'CreateCompte', path: '/CreateCompte', component: CreateCompte },
    { name : 'NotFound' , path : '/:pathMatch(.*)*', component: NotFound},
    { name : 'gestionMembreCompte' , path : '/gestionMembreCompte', component: gestionMembreCompte},
    { name : 'gestionDepense' , path : '/gestionDepense', component: gestionDepense},
    { name : 'gestionDepense' , path : '/gestionDepense/:label', component: gestionDepense},
    { name :  'BalanceDepense' , path : '/BalanceDepense', component: BalanceDepense},

]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router

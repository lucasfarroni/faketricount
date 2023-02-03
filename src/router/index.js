import { createRouter, createWebHistory } from 'vue-router'
import NotFound from "@/components/NotFound.vue";
import CreateAccount from "@/components/CreateAccount";
import memberManagement from "@/components/memberManagement";
import expenseManagement from "@/components/expenseManagement";

const routes = [
    { name: 'CreateAccount', path: '/', component: CreateAccount },
    { name : 'memberManagement' , path : '/memberManagement', component: memberManagement},
    { name : 'memberManagement' , path : '/memberManagement/:label', component: memberManagement},
    { name : 'expenseManagement' , path : '/expenseManagement', component: expenseManagement},
    { name : 'expenseManagement' , path : '/expenseManagement/:label', component: expenseManagement},



    //error404
    { name : 'NotFound' , path : '/:pathMatch(.*)*', component: NotFound},

]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router

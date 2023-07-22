import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "@/views/Home.vue";
import Skin from "@/views/Skin.vue";
import Content from "@/views/Content.vue";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        redirect: '/Skin',
        component: Home,
        children: [

            {
                path: '/skin',
                name: 'Skin',
                component: Skin

            },
            {
                path: '/content',
                name: 'Content',
                component: Content,
            }
        ]
    },
]

const router = new VueRouter({
    routes
})




export default router


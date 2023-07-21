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

//  NavigationDuplicated error
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}

const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location, onResolve, onReject) {
    if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
    return originalReplace.call(this, location).catch(err => err)
}

export default router


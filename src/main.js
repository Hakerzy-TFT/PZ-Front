import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import homePage from './components/homePage.vue'
import howTo from './components/howTo.vue'
import aboutUs from './components/aboutUs.vue'
import contact from './components/contact.vue'
Vue.use(VueRouter)
Vue.config.productionTip = false

const routes = [
    { path: '/', component: homePage },
    { path: '/Home', component: homePage },
    { path: '/howTo', component: howTo },
    { path: '/aboutUs', component: aboutUs },
    { path: '/contact', component: contact },
]
const router = new VueRouter({
    routes
})
new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
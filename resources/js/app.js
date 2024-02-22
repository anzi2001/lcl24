import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

router.beforeEach(async (to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        const response = await fetch("/user");
        const data = await response.json();
        if (!data.name) {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        } else {
            next()
        }
    } else {
        next()
    }
});
createApp(App).use(router).mount('#app')

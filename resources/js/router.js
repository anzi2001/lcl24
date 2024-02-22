import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import SearchView from './views/SearchView.vue'

const routes = [
	{
		path: '/',
		name: 'SearchView',
		component: SearchView
	},
	{
		path: '/quotes',
		name: 'Quotes',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "quotes" */ './views/Quotes.vue')
	},
	{
		path: '/quotesDetail',
		name: 'QuotesDetail',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "quotesDetail" */ './views/QuotesDetail.vue'),
		meta: {
			requiresAuth: true
		}
	},
	{
		path: "/pricing",
		name:"Pricing",
		component: ()=> import(/*webpackChunkName: "pricing"*/ "./views/Pricing.vue")
	},
	{
		path: "/innovation",
		name:"Innovation",
		component: ()=> import(/*webpackChunkName: "innovation"*/ "./views/Innovation.vue")
	},
	{
		path: "/aboutUs",
		name:"AboutUs",
		component: ()=> import(/*webpackChunkName: "aboutUs"*/ "./views/AboutUs.vue")
	},
	{
		path: "/contact",
		name:"Contact",
		component: ()=> import(/*webpackChunkName: "contact"*/ "./views/Contact.vue")
	},
	{
		path: "/login",
		name:"Login",
		component: ()=> import(/*webpackChunkName: "login"*/ "./views/Login.vue")
	},
	{
		path:"/register",
		name:"Register",
		component: ()=> import(/*webpackChunkName: "register"*/ "./views/Register.vue")
	},
	{ path: "/:catchAll(.*)", component: ()=>import( /*webpackChunkName: "404"*/ "./views/404.vue") }
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
import { auth } from '@/firebase'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    meta: {requiresAuth: true}
  },
  {
    path: '/ingreso',
    name: 'Ingreso',
    component: () => import(/* webpackChunkName: "ingreso" */ '../views/Ingreso.vue'),
    
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "ingreso" */ '../views/Admin.vue'),
    meta: {requiresAuth: true}
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// esto es para proteger una ruta 
router.beforeEach((to, from, next) => {
  const user = auth.currentUser;
  if(to.matched.some(record => record.meta.requiresAuth)){
    if (user) {
      next()
    } else {
      next({name: 'Ingreso'}) 
    }
  }else{
    next()
  }
})

export default router

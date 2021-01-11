import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Contact from '../views/Contact.vue'
import LegalDisclosure from '../views/LegalDisclosure.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/legaldisclosure',
    name: 'LegalDisclosure',
    component: LegalDisclosure
  },
  {
    // catch all 404 - define at the very end
    path: "*",
    component: () => import("../views/PageNotFound.vue")
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
import { authCheckToken } from '../api/auth.checkToken.js';

router.beforeEach(async (to, from, next) => {
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');
  const isTokenValid = await authCheckToken();

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn ) {
      next('/login');
  }
  // redirect to login if the session token is not longer available 
  else if (authRequired && loggedIn && !isTokenValid){
    next('/login');
  } 
  else {
    next();
  }
});

export default router

import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

import Hello from '@/components/Hello'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'

import VCalendar from 'v-calendar';
import 'v-calendar/lib/v-calendar.min.css';

// Use v-calendar, v-date-picker & v-popover components
Vue.use(VCalendar, {
  firstDayOfWeek: 2  // Monday
});

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/hello',
      name: 'Hello',
      component: Hello,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp
    }
  ]
});

//Redirect the routes if user is authenticated
router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('login');
  else if (!requiresAuth && currentUser) next('hello');
  else next()
});

export default router

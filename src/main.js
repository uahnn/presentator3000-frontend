import Vue from 'vue';
import VueRouter from 'vue-router';
import Icon from 'vue-awesome/components/Icon';
import 'vue-awesome/icons';
import App from './App';
import auth from './auth';
import Login from './components/Login';
import Hello from './components/Hello';
import Viewer from './components/Viewer';
import Register from './components/Register';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Dashboard from './components/Dashboard';
import Presentations from './components/Presentations';

Vue.use(VueRouter);
Vue.component('icon', Icon);

function requireAuth(to, from, next) {
  if (!auth.loggedIn()) {
    next({
      path: '/login',
      query: { redirect: to.fullPath },
    });
  } else {
    next();
  }
}

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  linkActiveClass: 'active',
  routes: [
    { path: '/', name: 'hello', component: Hello },
    { path: '/dashboard', name: 'dashboard', component: Dashboard, beforeEnter: requireAuth },
    { path: '/register', name: 'register', component: Register },
    { path: '/pricing', name: 'pricing', component: Pricing },
    { path: '/features', name: 'features', component: Features },
    { path: '/presentations', name: 'presentations', component: Presentations },
    { path: '/view', name: 'viewer', component: Viewer },
    { path: '/login', component: Login },
    { path: '/logout',
      beforeEnter(to, from, next) {
        auth.logout();
        next('/');
      },
    },
  ],
  redirect: {
    '*': '/',
  },
});


/* eslint-disable no-new */
new Vue({
  el: '#presentator',
  router,
  render: h => h(App),
});

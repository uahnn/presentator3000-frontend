import 'expose-loader?$!expose-loader?jQuery!jquery';
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
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
import Presentation from './components/Presentation';

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.component('icon', Icon);

Vue.prototype.filters = {
  // slugify returns an url-friendly string
  slugify: function (value) {
    const from = 'ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;';
    const to = 'aaaaaeeeeeiiiiooooouuuunc------';
    let returnValue = value.replace(/^\s+|\s+$/g, ''); // trim
    returnValue = returnValue.toLowerCase();

    // remove accents, swap ñ for n, etc
    for (let i = 0, l = from.length; i < l; i++) {
      returnValue = returnValue.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    returnValue = returnValue
      .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes

    return returnValue;
  },
};


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
    { path: '/presentation/edit/:title/:pid', name: 'presentation', component: Presentation },
    { path: '/presentation/view/:title/:pid', name: 'viewer', component: Viewer },
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

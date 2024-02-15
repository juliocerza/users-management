import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Register from '../components/users/User-Register.vue';
import Login from '../components/users/User-Login.vue';
import Admin from '../components/guards/Admin-Management.vue';
import axios from 'axios';
import Edit from '../components/users/User-Edit.vue';

function AdminAuth(to, from, next) {
  if (localStorage.getItem('token') != undefined) {
    let req = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };

    axios
      .post('http://localhost:2300/validate', {}, req)
      .then((res) => {
        console.log(res);
        next();
      })
      .catch((err) => {
        console.log(err);
        next('/login');
      });
  } else {
    next('/login');
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/cadastro',
    name: 'Register',
    component: Register,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    beforeEnter: AdminAuth,
  },
  {
    path: '/admin/editar/:id',
    name: 'Edit',
    component: Edit,
    beforeEnter: AdminAuth,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

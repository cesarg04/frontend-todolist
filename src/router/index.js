import { createRouter, createWebHistory } from "vue-router";
import Home from '../views/Home.vue';
import Auth from '../views/Auth.vue';
import Login from '../components/Auth/Login.vue';
import Register from '../components/Auth/Register.vue';

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/auth",
    name: "Auth",
    component: Auth,
    children:[
      {
        path: '/login',
        name: 'Login',
        component: Login
      },
      {
        path: '/register',
        name: 'Register',
        component: Register
      }
    ]

  },
  { path: '/:pathMatch(.*)*',
    name: 'Page not Found',
    component: Home,
  }
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
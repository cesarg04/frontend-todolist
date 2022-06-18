import { createRouter, createWebHistory } from "vue-router";
import Home from '../views/Home.vue'
import Auth from '../views/Auth.vue'

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Auth",
    component: Auth,

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
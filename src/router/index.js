import Vue from "vue";
import VueRouter from "vue-router";
import Todolist from '../components/Todolist';
import Login from "../components/Login";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "todolist",
    component: Todolist,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;

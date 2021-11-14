import { createRouter, createWebHistory } from "vue-router";
import store from "../store";
import Home from "../views/Home.vue";
import EmployeesCreate from "../views/Employees/EmployeesCreate.vue";
import EmployeesUpdate from "../views/Employees/EmployeesUpdate.vue";
import Beneficiaries from "../views/Beneficiaries/Beneficiaries.vue";
import PageNotFound from "../views/General/PageNotFound.vue";
import Login from "../views/General/Login.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: { protectedRoute: true }
  },
  {
    path: "/employees/create",
    name: "employees_create",
    component: EmployeesCreate,
    meta: { protectedRoute: true }
  },
  {
    path: "/employees/update/:id",
    name: "employees_update",
    component: EmployeesUpdate,
    meta: { protectedRoute: true }
  },
  {
    path: "/beneficiaries/:id",
    name: "beneficiaries",
    component: Beneficiaries,
    meta: { protectedRoute: true }
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  { 
    path: "/:catchAll(.*)", 
    name:"page-not-found", 
    component: PageNotFound,
    meta: { protectedRoute: true }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.protectedRoute) {
    if (store.getters.authenticatedUser) {
      if (to.name === "login") router.push("/");
      else next();
    } else 
      next("/login");
  } else next();
});

export default router;

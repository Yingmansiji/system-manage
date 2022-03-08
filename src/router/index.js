import {createRouter, createWebHistory} from "vue-router";
import store from "../store";

const Login = () => import("@/views/login");
const Home = () => import("@/views/Pages/home/index");
const Tabs = () => import("@/views/Pages/home/tabs");

const routes = [
    {
        path: "/",
        component: Home
    },
    {
        path: "/login",
        name: "login",
        component: Login,
    },
    {
        path: "/tabs",
        name: "tabs",
        component: Tabs,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    let token = store.state["ETH-TOKEN"];
    if (to.path === "/login") {
        if (token === null || token === "") {
            next();
        } else {
            next("/");
        }
    } else {
        if (token === null || token === "") {
            next("/login");
        } else {
            next();
        }
    }
});
export default router;

import { createRouter, createWebHistory } from "vue-router";


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/login",
            component: () => import("../components/views/Login.vue"),
        },
        {
            path: "/register",
            component: () => import("../components/views/Register.vue"),
        },
        {
            name: "Stories",
            path: "/stories",
            component: () => import("../components/views/Stories.vue"),
        },
        {
            name: "Story",
            path: "/stories/:id",
            component: () => import("../components/views/Story.vue"),
        },
        {
            path:'/',
            component: () => import("../components/views/Home.vue"),
        },
       
    ],
});

export default router;
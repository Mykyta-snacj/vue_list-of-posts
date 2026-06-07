import { createRouter, createWebHistory } from 'vue-router'

import LoginPage from '@/pages/LoginPage.vue'
import PostsPage from '@/pages/PostsPage.vue'

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: LoginPage,
  },
  {
    path: '/posts',
    component: PostsPage,
  },
]

export const router = createRouter({
  history: createWebHistory('/vue_list-of-posts/'),
  routes,
})

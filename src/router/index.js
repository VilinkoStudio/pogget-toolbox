import { createRouter, createWebHashHistory } from 'vue-router'
import NormalHome from '../components/normal.vue'
import WebView from '../components/WebView.vue'
import ErrorPage from '../components/ErrorPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: NormalHome
  },
  {
    path: '/webview',
    name: 'WebView',
    component: WebView
  },
  {
    path: '/error',
    name: 'ErrorPage',
    component: ErrorPage
  },
  // 捕获所有其他路径
  {
    path: '/:catchAll(.*)',
    component: ErrorPage
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant';
import 'vant/lib/index.css';
import vueResource from 'vue-resource'


Vue.use(vueResource)
Vue.use(Vant);
import { Lazyload } from 'vant';

Vue.use(Lazyload);
// 全局引入vant的提示框
import { Toast } from "vant";
Vue.use(Toast); 

import qs from 'qs'
Vue.prototype.qs = qs

Vue.config.productionTip = false
    //注册到vue原型上
import clipboard from 'clipboard';
Vue.prototype.clipboard = clipboard;
// 引入文件
import './assets/js/rem.js'
import './assets/js/url.js'
import './assets/css/style.css'
// 复制
import VueClipboard from 'vue-clipboard2'
VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard)
//vuex
import store from './store/index.js'
//将axios挂载到原型上
import axios from 'axios'
Vue.prototype.$axios = axios
    //api
import address from './api/api'
Vue.prototype.address = address


//配置全局的axios默认值（可选）
axios.defaults.baseURL = ' http://dongbei.biding.pro';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// 这只请求根路径
Vue.http.options.root = ' http://dongbei.biding.pro'
//router
// router.beforeEach((to, from, next) => {
//     store.state.userMsg = localStorage.getItem('userMsg') //获取本地存储的token
//     if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
//         if (store.state.userMsg !== null || '') { // 通过vuex state获取当前的token是否存
//             next();
//         } else {
//             Toast({ message: "该页面需要登陆", });
//             next({
//                 path: '/login',
//             })
//         }
//     } else {
//         next();
//     }
// })

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
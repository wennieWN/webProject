import Vue from 'vue'
import Router from 'vue-router'


import Home from '@/views/Home'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Center from '@/views/Center'
import color from '../../src/views/color.vue'
import index from '../views/index.vue'
import game from '../views/game.vue'


// 引入样式
import 'vue-easytable/libs/themes-base/index.css'
// 导入 table 和 分页组件
import {VTable,VPagination} from 'vue-easytable'

// 注册到全局
Vue.component(VTable.name, VTable)
Vue.component(VPagination.name, VPagination)


Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'index',
      component: index
    }, {
      path: '/color',
      name: 'color',
      component: color
    },,{
      path: '/game',
      name: 'game',
      component: game
    },{
        path: '/login',
        name: 'Login',
        component: Login
    }, {
        path: '/register',
        name: 'Register',
        component: Register
    }, {
        path: '/center',
        name: 'Center',
        component: Center
    }]
})

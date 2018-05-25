import Vue from 'vue'
import Router from 'vue-router'


import Index from '@/views/Index'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Center from '@/views/Center'
import color from '../views/Color.vue'
import game from '../views/game.vue'
import Start from '../views/Start.vue'
import City from '../views/City.vue'


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
        name: 'Start',
      component: Start
    }, {
        path: '/index',
        name: 'Index',
        component: Index
    }, {
      path: '/color',
      name: 'color',
      component: color
    },{
      path: '/game',
      name: 'game',
      component: game
    },{
        path: '/city',
        name: 'City',
        component: City
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

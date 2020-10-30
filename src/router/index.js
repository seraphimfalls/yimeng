import Vue from 'vue'
import Router from 'vue-router'
import home from '@/view/Home/home'
import declaration from '@/view/Home/declaration'
import cashTransfer from '@/view/Home/cashTransfer'
import cashReplacement from '@/view/Home/cashReplacement'
import cashReplacementList from '@/view/property/cashReplacementList'
import cashRepayment from '@/view/property/cashRepayment'
import login from '@/view/Login/login'
import register from '@/view/Login/register'
import registerSuccess from '@/view/Login/registerSuccess'
import forgetPassword from '@/view/Login/forgetPassword'
import property from '@/view/property/property'
import buyGold from '@/view/property/buyGold'
import cash from '@/view/property/cash'
import financial from '@/view/property/financial'
import moneyList from '@/view/property/moneyList'
import store from '@/view/store/store'
import mine from '@/view/my/mine'
import list from '@/view/my/list'
import share from '@/view/my/share'
import team from '@/view/my/team'
import alipay from '@/view/my/alipay'
import wechat from '@/view/my/wechat'
import bank from '@/view/my/bank'
import withdrawal from '@/view/my/withdrawal'
import safe from '@/view/my/safe'
import service from '@/view/my/service'
import search from '@/view/store/search'
import goodsDetail from '@/view/store/goodsDetail'
import goodList from '@/view/store/goodList'
import order from "@/view/store/order"
import adressList from '@/view/store/adressList'
import addAdress from '@/view/store/addAdress'
import myOrder from '@/view/store/myOrder'
import activityDetail from '@/view/store/activityDetail'
import onSale from "@/view/store/onSale"
import orderPay from "@/view/store/orderPay"
import orderDetail from "@/view/store/orderDetail"
Vue.use(Router)


export default new Router({
    routes: [{
            path: '/',
            name: 'login',
            component: login
        }, 
        {
            path: '/home',
            name: 'home',
            component: home
        },
        {
            path: '/login',
            name: 'login',
            component: login
        },
        {
            path: '/register',
            name: 'register',
            component: register
        },
        {
            path: '/registerSuccess',
            name: 'registerSuccess',
            component: registerSuccess
        },
        {
            path: '/forgetPassword',
            name: 'forgetPassword',
            component: forgetPassword
        },
        {
            path: '/declaration',
            name: 'declaration',
            component: declaration
        },
        {
            path: '/cashTransfer',
            name: 'cashTransfer',
            component: cashTransfer
        },
        {
            path: '/cashReplacement',
            name: 'cashReplacement',
            component: cashReplacement
        },
        {
            path: '/cashReplacementList',
            name: 'cashReplacementList',
            component: cashReplacementList
        },
        {
            path: '/cashRepayment',
            name: 'cashRepayment',
            component: cashRepayment
        },
        {
            path: '/property',
            name: 'property',
            component: property
        },
        {
            path: '/store',
            name: 'store',
            component: store
        },
        {
            path: '/buyGold',
            name: 'buyGold',
            component: buyGold
        },
        {
            path: '/cash',
            name: 'cash',
            component: cash
        },
        {
            path: '/financial',
            name: 'financial',
            component: financial
        },
        {
            path: '/moneyList',
            name: 'moneyList',
            component: moneyList
        },
        {
            path: '/mine',
            name: 'mine',
            component: mine
        },
        {
            path: '/list',
            name: 'list',
            component: list
        },
        {
            path: '/share',
            name: 'share',
            component: share
        },
        {
            path: '/team',
            name: 'team',
            component: team
        },
        {
            path: '/alipay',
            name: 'appalipayly',
            component: alipay
        },
        {
            path: '/wechat',
            name: 'wechat',
            component: wechat
        },
        {
            path: '/bank',
            name: 'bank',
            component: bank
        },
        {
            path: '/safe',
            name: 'safe',
            component: safe
        },
        {
            path: '/withdrawal',
            name: 'withdrawal',
            component: withdrawal
        },
        {
            path: '/service',
            name: 'service',
            component: service
        },
        {
            path: '/search',
            name: 'search',
            component: search
        },
        {
            path: '/goodsDetail',
            name: 'goodsDetail',
            component: goodsDetail
        },
        {
            path: '/goodList',
            name: 'goodList',
            component: goodList
        },
        {
            path: '/order',
            name: order,
            component: order
        },
        {
            path: '/adressList',
            name: 'adressList',
            component: adressList
        },
        {
            path: '/addAdress',
            name: 'addAdress',
            component: addAdress
        },
        {
            path: '/myOrder',
            name: 'myOrder',
            component: myOrder
        },
        {
            path: '/activityDetail',
            name: 'activityDetail',
            component: activityDetail
        },
        {
            path: '/onSale',
            name: 'onSale',
            component: onSale
        },
        {
            path: '/orderPay',
            name: 'orderPay',
            component: orderPay
        },
        {
            path: '/orderDetail',
            name: 'orderDetail',
            component: orderDetail
        }
    ]
})
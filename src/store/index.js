import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
var userMsg = JSON.parse(localStorage.getItem('userMsg') || '[]')


const store = new Vuex.Store({
    state: {
        userMsg: userMsg, //用户信息的保存
        arr: [],
        msg: "huqiang",
        count: 0,



    },
    // 这里的getters 只负责对外提供数据，不负责修改数据 如果要修改state中的数据 去使用mutations
    getters: {
        optCount: function(state) {
            return state.count
        }
    },
    mutations: {
        //保存用户信息
        getUserMsg(state, userMsg) {
            state.userMsg = JSON.parse(userMsg)
            localStorage.setItem('userMsg', userMsg)
        },
        //清空用户信息
        clearUserMsg() {
            localStorage.removeItem('userMsg')
        },
        setarr(state) {
            state.arr = [1, 2, 3]
        },
        change(state, data) {
            state.msg = data
        },
        // 加
        add(state) {
            state.count++


        },
        // 减
        payadd(state) {
            state.count--


        }




    },

})

export default store;
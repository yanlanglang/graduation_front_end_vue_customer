import Vue from 'vue'
import Vuex from 'vuex'

//使用vuex
Vue.use(Vuex)


const state = {
    isLogin: false,
    customer: null
}

const mutations = {
    // mutation 的第一个参数是当前的 state
    // 你可以在函数里修改 state,第二个参数传过来的参数
    changeIsLogin(state, data) {
        state.isLogin = data;
        
    },

    changeCustomer(state, data){
        state.customer = data;
        state.customer.avatar = 'http://localhost:8000/yl'+state.customer.avatar;
        
    }

}

//创建vuex实例对象
const store = new Vuex.Store({
    state,
    mutations
})

export default store //导出store，文件末尾要换行


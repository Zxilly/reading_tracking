import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import Vuex from 'vuex'

Vue.use(Vuex)

Vue.prototype.$bus=new Vue()

Vue.prototype.$mobile=function (){
    return document.body.clientWidth<600
}

const store = new Vuex.Store({
    state:{
        username:'',
        snackbar:{
            msg:'',
            color:'info'
        }
    },
    mutations:{
        snackbar:function (state,payload){
            state.snackbar.msg=payload.msg
            state.snackbar.color=payload.color
        },
        login:function (state,payload){
            state.username=payload
        }
    }
})

Vue.config.productionTip = false

new Vue({
    el:'#app',
    vuetify,
    store,
    render: h => h(App)
})

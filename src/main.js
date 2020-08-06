import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import Vuex from 'vuex'

Vue.use(Vuex)

const isDebug_mode = process.env.NODE_ENV !== 'production'
Vue.config.debug = isDebug_mode
Vue.config.devtools = isDebug_mode
Vue.config.productionTip = isDebug_mode

Vue.prototype.$bus=new Vue()

Vue.prototype.$mobile=function (){
    return document.body.clientWidth<600
}

Vue.prototype.$snackbar=function (msg,color){
    mainel.$store.commit('snackbar',[msg,color]);
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


 var mainel = new Vue({
    el:'#app',
    vuetify,
    store,
    render: h => h(App)
})

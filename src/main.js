import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import Cookies from 'js-cookie'
//import axios from 'axios'

Vue.config.productionTip = false

new Vue({
    vuetify,
    created: function () {
        if(this.checkCookie()){
            this.loginStates = true;
            this.user = Cookies.get('user')
        }
        else{
            this.loginStates = false
        }
    },
    methods: {
        checkCookie:()=>{
            return Cookies.get('user') != null;
        },

    },
    data:{
        loginStates:false,
        user:'',
    },
    render: h => h(App)
}).$mount('#app')

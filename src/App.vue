<template>
  <v-app id="app">
    <v-main id="a" class="grey lighten-5">
      <v-app-bar
          app
          dark
          color="blue darken-3"
      >
        <v-btn icon>
          <v-icon>mdi-book-multiple-outline</v-icon>
        </v-btn>
        <v-toolbar-title class="font-weight-light">
          <span class="font-weight-bold">Reading</span>Tracking
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
            icon
        >
          <v-icon @click="refresh">mdi-refresh</v-icon>
        </v-btn>
        <v-menu>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                icon
                v-bind="attrs"
                v-on="on"
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list rounded>
            <v-subheader>About Project</v-subheader>
            <v-list-item-group>
              <v-list-item @click="jumptoblog">
                <v-list-item-icon>
                  <v-icon>mdi-post</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Blog</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item @click="jumptogithub">
                <v-list-item-icon>
                  <v-icon>mdi-github</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Github</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>
      </v-app-bar>
      <v-container v-if="loginStates&&!isfirst">
        <card
            :bookdata="bookdata"
        />
      </v-container>
      <template v-else-if="loginStates&&isfirst">
        <addbook
            :isfirst="isfirst"
        />
      </template>
      <template v-else>
        <login v-on:login="loginStates=true;login"/>
      </template>
    </v-main>
  </v-app>
</template>

<script>

//var apiurl = 'http://rt.api.learningman.top/api'

var apiurl = 'http://127.0.0.1:4000/api'

import Card from "@/components/card";
import Login from "@/components/login";
import Addbook from "@/components/addbook";

import Cookies from "js-cookie";
import axios from 'axios';

export default {
  name: 'App',
  created: function () {
    if(this.checkCookie()){
      this.loginStates = true;
      this.username = Cookies.get('user')
      this.getinfo()
      //console.log(this.user)
    }
    else{
      this.loginStates = false;
    }
  },
  data:()=>{
    return {
      loginStates:false,
      username:'',
      isfirst:true,
      bookdata:[],
    }
  },
  methods: {
    jumptoblog: () => {
      window.open('https://learningman.top', '_blank');
    },
    jumptogithub: () => {
      window.open('https://github.com', '_blank');
    },
    refresh: () => {

    },
    checkCookie:()=>{
      return Cookies.get('user') != null;
    },
    login:()=>{
      this.username = Cookies.get('user')
      this.getinfo()
    },
    getinfo:function (){
      var that = this
      console.log('OK')
      axios.get(apiurl,{
        params:{
          user:this.username
        }
      }).then(function (response){
        if(response['code']===0){
          that.isfirst=true
        }
        else if(response['code']===1){
          that.isfirst=false
          that.bookdata=response['data']
        }
      })
    }
  },
  components: {
    Addbook,
    Card,
    Login
  }
}
</script>
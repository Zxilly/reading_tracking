<template>
  <v-app id="app">
    <v-main id="a" class="grey lighten-5" transition="fade-transition">
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
          <v-icon @click="refresh(false)">mdi-refresh</v-icon>
        </v-btn>
        <v-menu min-width="10em">
          <template #activator="{ on, attrs }">
            <v-btn
                icon
                v-bind="attrs"
                v-on="on"
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
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
      <template v-if="loginStates&&!isfirst">
        <card
            :bookdata="bookdata"
            :username="username"
        />
        <addbook
            :isfirst='false'
        />
      </template>
      <template v-else-if="loginStates&&isfirst">
        <first
            v-show="isfirstshow"
        />
        <addbook
            v-show="isfirstshow"
            :isfirst='true'
            @notfirst="isfirst=false"
        />
      </template>
      <template v-else>
        <login
            @login="loginfinish"
        />
      </template>
      <snackbar/>
    </v-main>
  </v-app>
</template>

<script>
import First from "@/components/first";
import Addbook from "@/components/addbook";
import Card from "@/components/card";
import Login from "@/components/login";
import Snackbar from "@/components/snackbar";

import Cookies from "js-cookie";
import axios from 'axios';

import {apiurl} from '@/config'



//var apiurl = 'http://192.168.1.108:4000/api'

export default {
  name: 'App',
  created() {
    if (this.checkCookie()) {
      this.loginStates = true;
      this.login()
    } else {
      this.loginStates = false;
    }
  },
  mounted() {
    this.$bus.$on('refresh', this.refresh)
  },
  data: () => {
    return {
      loginStates: false,
      username: '',
      isfirst: true,
      isfirstshow: false,
      bookdata: [],
    }
  },
  methods: {
    jumptoblog: () => {
      window.open('https://learningman.top', '_blank');
    },
    jumptogithub: () => {
      window.open('https://github.com', '_blank');
    },
    checkCookie: () => {
      return Cookies.get('user') != null;
    },
    login: function () {
      //console.log('login is on')
      this.username = Cookies.get('user')
      this.$store.commit('login', this.username)
      this.getinfo()
    },
    getinfo: function () {
      var that = this
      axios.get(apiurl, {
        params: {
          user: that.username
        }
      }).then(function (response) {
        if (response.data['code'] === 0) {
          that.isfirst = true
          that.isfirstshow = true
        } else if (response.data['code'] === 1) {
          that.bookdata = response.data['data']['books']
          that.isfirst = false
        }
      })
    },
    showSnackbar: function (snackbar_arg) {
      //FIXME: commit snackbar
      this.$store.commit('snackbar', snackbar_arg)
    },
    loginfinish: function () {
      this.login();
      this.loginStates = true;
    },
    refresh: function (silent) {
      this.getinfo()
      //console.log(silent)
      if (!silent) {
        this.showSnackbar({
          msg: '刷新成功',
          color: 'success',
        })
      }
    }
  },
  components: {
    Addbook,
    First,
    Snackbar,
    Card,
    Login
  }
}
</script>
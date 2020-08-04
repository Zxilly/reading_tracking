<template>
  <v-row
      justify="center"
      align="center"
  >
    <v-col
        style="margin-top: 20vh"
        cols="12"
        sm="8"
        md="4"
    >
      <v-card>
        <v-toolbar
            color="primary"
            dark
        >
          <v-toolbar-title>Login</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
            <v-text-field
                label="username"
                name="login"
                prepend-icon="mdi-account"
                type="text"
                v-model="username"
                required
            ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="primary"
              class="ma-3"
              @click="setCookie"
          >Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  name: "login",
  data() {
    return {
      username:'',
      snackbar:{
        msg:'',
        color:'success'
      },
    }
  },
  methods:{
    setCookie:function (){
      Cookies.set('user', this.username, { expires: 365 });
      this.snackbar.msg=this.username+' 成功登录'
      this.$store.commit('snackbar',this.snackbar)
      this.$emit('login');
    }
  }
}
</script>

<style scoped>

</style>
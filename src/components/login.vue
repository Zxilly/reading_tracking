<template>
  <div v-if="mobile">
    <login-mobile
        @success="login"
    />
  </div>
  <div v-else>
    <login-desktop
        @success="login"
    />
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import LoginMobile from "@/components/login/loginmobile";
import LoginDesktop from "@/components/login/logindesktop";

export default {
  name: "LoginC",
  components: {LoginDesktop, LoginMobile},
  computed: {
    mobile: function () {
      return this.$mobile()
    }
  },
  methods: {
    login: function (username) {
      Cookies.set('user', username, {expires: 365});
      let msg = username + ' 成功登录'
      this.$store.commit('snackbar', {
        'msg':msg,
        'color':'success'
      })
      this.$store.commit('login',username);
      this.$emit('login');
    }
  }
}
</script>

<style scoped>

</style>

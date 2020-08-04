<template>
  <div v-if="mobile">
    <loginmobile
        @success="login"
    />
  </div>
  <div v-else>
    <logindesktop
        @success="login"
    />
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import Loginmobile from "@/components/login/loginmobile";
import Logindesktop from "@/components/login/logindesktop";

export default {
  name: "login",
  components: {Logindesktop, Loginmobile},
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
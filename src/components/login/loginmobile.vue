<template>
  <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
    <v-card>
      <v-toolbar dark color="primary">
        <v-toolbar-title>登录</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="login">保存</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-list>
        <v-list-item class="mt-4">
          <v-list-item-content>
            <v-list-item-title class="mb-1">用户名</v-list-item-title>
            <v-text-field
                filled
                v-model="username"
                required
            />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "loginmobile",
  data() {
    return {
      dialog: true,
      username: ''
    }
  },
  methods: {
    login: function () {
      this.$emit('success', this.username);
    }
  }
}
</script>

<style scoped>

</style>
<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card class="pa-2">
      <v-card-title>
        <span class="headline">登录</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                  ref="user"
                  label="用户名"
                  v-model="username"
                  :rules="rule"
                  @keydown.enter="login"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="blue darken-1"
            text
            @click="login"
        >登录
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "logindesktop",
  data() {
    return {
      dialog: true,
      username: '',
      rule: [value => !!value || '用户名不能为空',]
    }
  },
  methods: {
    login: function () {
      if(this.$refs.user.validate()) {
        this.$emit('success', this.username);
      }
    },
  }
}
</script>

<style scoped>

</style>
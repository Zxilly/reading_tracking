<template>
  <v-snackbar
      v-model="show"
      :color="color"
      top
      dark
  >
    {{ message }}
    <template v-slot:action="{ attrs }">
      <v-btn
          dark
          text
          v-bind="attrs"
          @click="show = false"
      >
        关闭
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: "SnackBar",
  data () {
    return {
      show: false,
      message: '',
      color: ''
    }
  },
  created () {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'snackbar') {
        this.message = state.snackbar.msg
        this.color = state.snackbar.color
        this.show = true
      }
    })
  }
}
</script>

<style scoped>

</style>

<template>
  <v-snackbar
      v-model="native_snackbar"
      :color="snackbarcolor"
      top
      dark
  >
    {{ msg }}

    <template v-slot:action="{ attrs }">
      <v-btn
          dark
          text
          v-bind="attrs"
          @click="native_snackbar = false"
      >
        关闭
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: "snackbar",
  props: ['snackbar','snackbarcolor','msg'],
  computed:{
    native_snackbar(){
      return this.snackbar
    }
  }
}
</script>

<style scoped>

</style>
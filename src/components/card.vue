<template>
  <v-card class="d-inline-block mx-auto mt-12">
    <v-container>
      <v-row justify="space-between">
        <v-col cols="auto">
          <v-img
              height="200"
              width="200"
              src="https://cdn.vuetifyjs.com/images/cards/store.jpg"
          ></v-img>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "card",
  props: ['bookdata','username'],
}
</script>

<style scoped>

</style>
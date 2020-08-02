<template>
    <v-container class="mt-12">
      <v-row>
          <bookcard
              v-for="(book,index) in bookdata"
              :key="index"
              :username="username"
              :book="book"
          />
      </v-row>
    </v-container>
</template>

<script>
import Bookcard from "@/components/bookcard";
export default {
  name: "card",
  components: {Bookcard},
  props: ['bookdata','username']
}
</script>

<style scoped>

</style>
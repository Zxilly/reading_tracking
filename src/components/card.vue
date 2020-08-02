<template>
    <v-container class="mt-md-12 mt-xs-8" style="margin-bottom: 150px">
      <v-row>
          <bookcard
              v-for="(book,index) in bookdata"
              :key="index"
              :username="username"
              :book="book"
              @refresh="$emit('refresh')"
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
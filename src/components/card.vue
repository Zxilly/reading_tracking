<template>
    <v-container class="mt-md-12 mt-xs-8" style="margin-bottom: 150px;max-width: 90%!important;" fluid>
      <v-row>
          <book-card
              v-for="(book,index) in bookdata"
              :key="index"
              :username="username"
              :book="book"
          />
      </v-row>
    </v-container>
</template>

<script>
import BookCard from "@/components/bookcard";
export default {
  name: "CardC",
  components: {BookCard},
  props: ['bookdata','username'],
  methods:{
  }
}
</script>

<style scoped>

</style>

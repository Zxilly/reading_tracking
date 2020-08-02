<template>
  <v-col
      sm="12"
      md="6"
      lg="4"
      class="d-flex-inline justify-center"
  >
    <v-card
        width="80%"

    >
      <div
          class="d-flex flex-no-wrap justify-space-between"
      >
        <div
            class="d-inline-flex flex-column justify-space-between"
        >
          <div>
            <v-card-title
                v-text="book.title"
            />
            <v-card-subtitle
                v-text="book.author_str===''?'未知':book.author_str"
            />
          </div>
          <div>

          </div>
        </div>
        <v-sheet
            elevation="1"
            width="20%"
            color="lighten-4 grey"
            class="pa-2 ma-4"
        >
          <v-img
              :aspect-ratio="31/43"
              src="http://127.0.0.1:4000/data/books/img/9787115390592.jpg"
          />
        </v-sheet>
      </div>
      <v-card-actions>
        <v-btn text>Share</v-btn>

        <v-btn
            color="purple"
            text
        >
          Explore
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn
            icon
            @click="show = !show"
        >
          <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>
      </v-card-actions>
      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>

          <v-card-text>
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for
            sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey,
            you
            add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to
            escape.
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: "bookcard",
  props: ['username', 'book'],
  data() {
    return {
      show: false,
    }
  }
}
</script>

<style scoped>

</style>
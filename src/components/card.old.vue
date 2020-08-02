<template>
  <v-card>
    <v-container>
      <div
          class="d-flex flex-no-wrap justify-start py-4 px-2"
      >
        <v-sheet
            elevation="3"
            width="30%"
            height="80%"
            color="lighten-4 grey"
            class="pa-2"
        >
          <v-img
              :aspect-ratio="31/43"
              src="http://127.0.0.1:4000/data/books/img/9787115390592.jpg"
          />
        </v-sheet>
        <div
            class="d-inline-flex flex-column justify-space-between flex-nowrap ml-2"
        >
          <div>
            <v-card-title
                v-text="'C Primer Plus（第6版）中文版'"
                class="text-h5 font-weight-bold"
            />
            <v-card-subtitle
                v-text="'普拉达 (Stephen Prata)'"
            />
          </div>
          <div
              class="pb-0 pa-4">
            <div
                class="d-inline-flex align-end"
                style="height: 100%"
            >
              <v-btn
                  icon
                  large
              >
                <v-icon>mdi-update</v-icon>
              </v-btn>
            </div>
            <p
                class="mb-0 font-weight-medium float-right"
            >
              <span
                  class="font-weight-bold text-h2 blue--text text--darken-3 mr-n2"
              >
                370
              </span>
              <span
                  class="text-h4"
              >/</span>
              700
            </p>
          </div>
        </div>
      </div>
    </v-container>
    <v-progress-linear
        value="50"
        height="7px"
    ></v-progress-linear>
  </v-card>
</template>

<script>
export default {
  name: "card.old"
}
</script>

<style scoped>

</style>
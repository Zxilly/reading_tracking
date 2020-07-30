<template>
  <v-row
      justify="center"
      align="center"
  >
    <v-col
        style="margin-top: 20vh"
        cols="12"
        sm="8"
        md="4"
    >
      <v-card>
        <v-toolbar
            color="primary"
            dark
        >
          <v-btn icon>
            <v-icon>mdi-go-kart-track</v-icon>
          </v-btn>
          <v-toolbar-title>添加追踪项</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-text-field
              label="ISBN"
              name="isbn"
              prepend-icon="mdi-book-open-variant"
              type="text"
              v-model="isbn"
              :rules="rules.isbn"
          ></v-text-field>
          <v-text-field
              label="阅读页数"
              name="progress"
              prepend-icon="mdi-progress-clock"
              type="text"
              v-model="progress"
              :rules="rules.progress"
          ></v-text-field>
          <v-text-field
              label="备忘"
              name="tip"
              prepend-icon="mdi-bookmark-multiple"
              type="text"
              v-model="tip"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="primary"
              class="ma-3"
              @click="addbook"
          >添加
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "add_book",
  props: ['isfirst'],
  data() {
    return {
      progress: null,
      tip: '',
      isbn: '',
      rules: {
        isbn: [
          value => (value || '').length === 13 || 'ISBN应为13位',
          value => !!value || '必填'
        ],
        progress: [
          value => typeof value === Number || '阅读页数应为一个数字',
          value => !!value || '必填'
        ],
      }
    }
  },
  methods: {
    addbook: function () {

    },
  }
}
</script>

<style scoped>

</style>
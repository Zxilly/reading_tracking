<template>
  <div>
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
                type="string"
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
  </div>
</template>

<script>
var apiurl = 'http://localhost:4000/api' //TODO:production will fix

import axios from 'axios'

export default {
  name: "add_book",
  props: ['isfirst', 'username'],
  data() {
    return {
      snackbar:{
        msg:'',
        snackbarcolor:''
      },
      progress: null,
      tip: '',
      isbn: '',
      rules: {
        isbn: [
          value => !!value || '必填',
          value => (value || '').length === 13 || 'ISBN应为13位',
        ],
        progress: [
          value => !!value || '必填',
          value => Math.round(value).toString() === value || '阅读页数应为一个数字',
        ],
      }
    }
  },
  methods: {
    addbook: function () {
      var that = this
      axios({
        method: 'post',
        url: apiurl,
        params: {
          user: this.username
        },
        data: {
          'method': 'add',
          'book': {
            'isbn': this.isbn,
            'progress': this.progress,
            'tip': this.tip
          }
        }
      }).then(function (response) {
        if (response.data['code'] === 1) {
          that.snackbar.msg = response.data['msg'];
          that.snackbar.snackbarcolor = 'success';
          //console.log(1)
          that.$emit('showsnackbar',that.snackbar)
          if (that.isfirst) {
            //console.log('notfirst')
            that.$emit('notfirst')
          }
        }
        if (response.data['code'] === 4 || response.data['code'] === 5) {
          that.snackbar.msg = response.data['msg'];
          that.snackbar.snackbarcolor = 'error';
          //console.log(2)
          that.$emit('showsnackbar',that.snackbar)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
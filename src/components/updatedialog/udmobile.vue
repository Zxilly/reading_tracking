<template>
  <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>修改信息</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="saveinfo">保存</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-list>
        <v-list-item class="mt-4">
          <v-list-item-content>
            <v-list-item-title class="mb-1">书名</v-list-item-title>
            <v-text-field
                filled
                v-model="bookname"
                required
            />
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="mb-1">作者</v-list-item-title>
            <v-text-field
                filled
                v-model="author"
                required
            />
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="mt-4">
          <v-list-item-content>
            <v-list-item-title class="mb-1">页数</v-list-item-title>
            <v-text-field
                filled
                v-model="page"
                required
                :rules="rule"
            />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script>
import {updatedialog} from './ud'

export default {
  name: "UDMobile",
  props: ['book'],
  data() {
    return {
      dialog: false,
      bookname: this.book.title,
      author: this.book.author_str,
      page: this.book.page_total,
      rule: [
        value => !!value || '必填',
        value => (Math.round(value) === parseInt(value) && parseInt(value) >= 0) || '页数应为正整数',
        value => parseInt(value) < 853456 || '这本书的页数打破了世界纪录'
      ],
      snackbar: {
        color: 'info',
        msg: ''
      }
    }
  },
  methods: {
    saveinfo: function () {
      //console.log('save')
      this.dialog = false
      updatedialog(
          this.book.isbn, this.bookname, this.author, this.page
      ).then((msg) => {
        this.snackbar.color = 'success'
        this.snackbar.msg = msg
        this.$store.commit('snackbar', this.snackbar)
        this.$bus.$emit('refresh', true)
      })
    }
  }
}
</script>

<style scoped>

</style>

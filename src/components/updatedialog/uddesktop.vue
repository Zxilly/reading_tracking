<template>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card class="pa-2">
        <v-card-title>
          <span class="headline">修改信息</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                    label="书名"
                    v-model="bookname"
                    required/>
              </v-col>
              <v-col cols="12">
                <v-text-field
                    label="作者"
                    v-model="author"
                    required/>
              </v-col>
              <v-col cols="12">
                <v-text-field
                    label="页数"
                    v-model="page"
                    :rules="rule"
                    required/>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog=false">关闭</v-btn>
          <v-btn color="blue darken-1" text @click="saveinfo">保存</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import {updatedialog} from './ud'

export default {
  name: "UDDesktop",
  props: ['book'],
  data(){
    return{
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
        //this.$emit('refresh')
      })
    }
  }
}
</script>

<style scoped>

</style>

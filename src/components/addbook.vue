<template>
  <div v-if="mobile">
    <add-book-mobile
        @addbook="addbook"
        @reset="reset=!reset"
        :rules="rules"
        :reset="reset"
    />
  </div>
  <div v-else>
    <add-book-desktop
        @addbook="addbook"
        @reset="reset=!reset"
        :rules="rules"
        :key="reset"
    />
  </div>
</template>

<script>
import axios from 'axios'
import {apiurl} from '@/config'

import AddBookMobile from "@/components/addbook/addbookmobile";
import AddBookDesktop from "@/components/addbook/addbookdesktop";

export default {
  name: "AddBook",
  components: {AddBookDesktop, AddBookMobile},
  props: ['isfirst'],
  data() {
    return {
      reset: true,
      snackbar: {
        msg: '',
        color: ''
      },
      rules: {
        isbn: [
          value => !!value || '必填',
          value => (value || '').length === 13 || 'ISBN应为13位',
        ],
        progress: [
          value => !!value || '必填',
          value => (Math.round(value) === parseInt(value) && parseInt(value) >= 0) || '阅读页数应为正整数',
          value => parseInt(value) < 853456 || '这本书的页数打破了世界纪录'
        ],
      }
    }
  },
  computed: {
    mobile: function () {
      return this.$mobile()
    }
  },
  methods: {
    addbook: function ([isbn, progress, tip]) {
      var that = this
      axios({
        method: 'post',
        url: apiurl,
        params: {
          'user': this.$store.state.username
        },
        data: {
          'method': 'add',
          'book': {
            'isbn': isbn,
            'progress': progress,
            'tip': tip
          }
        }
      }).then(function (response) {
        if (response.data['code'] === 1) {
          that.snackbar.msg = response.data['msg'];
          that.snackbar.color = 'success';
          //console.log(1)
          that.$store.commit('snackbar', that.snackbar)
          that.$bus.$emit('refresh', true)
          if (that.isfirst) {
            //console.log('notfirst')
            that.$emit('notfirst')
          }
        }
        if (response.data['code'] === 4 || response.data['code'] === 5) {
          that.snackbar.msg = response.data['msg'];
          that.snackbar.color = 'error';
          that.$store.commit('snackbar', that.snackbar)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>

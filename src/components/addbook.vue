<template>
  <div v-if="mobile">
    <addbookmobile
        @addbook="addbook"
        :rules="rules"
    />
  </div>
  <div v-else>
    <addbookdesktop
        @addbook="addbook"
        :rules="rules"
    />
  </div>
</template>

<script>
import axios from 'axios'
import {apiurl} from '@/config'

import Addbookmobile from "@/components/addbook/addbookmobile";
import Addbookdesktop from "@/components/addbook/addbookdesktop";
export default {
  name: "addbook",
  components: {Addbookdesktop, Addbookmobile},
  props:['isfirst'],
  data() {
    return {
      snackbar:{
        msg:'',
        color:''
      },
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
  computed: {
    mobile: function () {
      return this.$mobile()
    }
  },
  methods: {
    addbook: function ([isbn,progress,tip]) {
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
          that.$store.commit('snackbar',that.snackbar)
          that.$bus.$emit('refresh',true)
          if (that.isfirst) {
            console.log('notfirst')
            that.$emit('notfirst')
          }
        }
        if (response.data['code'] === 4 || response.data['code'] === 5) {
          that.snackbar.msg = response.data['msg'];
          that.snackbar.color = 'error';
          that.$store.commit('showsnackbar',that.snackbar)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
<template>
  <v-dialog v-model="dialog" persistent width="95vw" max-width="400px">
    <v-card class="pa-2">
      <v-card-title>删除</v-card-title>
      <v-card-text>
        您确定要删除这本书吗？此操作<span class="red--text">不可逆</span>
      </v-card-text>
      <v-card-actions>
        <v-btn color="blue darken-1" text @click="dialog=false">关闭</v-btn>
        <v-spacer/>
        <v-btn color="red darken-1" dark class="font-weight-bold" @click="senddelete">删除</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios'
import {apiurl} from "@/config";

export default {
  name: "delete",
  props: ['isbn'],
  data(){
    return{
      dialog:false
    }
  },
  methods:{
    senddelete:function (){
      var that=this
      axios({
        method:'post',
        url:apiurl,
        params:{
          'user':this.$store.state.username
        },
        data:{
          'method':'delete',
          'book':{
            'isbn':this.isbn
          }
        }
      }).then(function (resp){
        let data=resp.data
        if(data['code']===3){
          that.$snackbar(data['msg'],'info')
        }
        that.$bus.$emit('refresh',true)
        that.dialog=false
      })
    }
  }
}
</script>

<style scoped>

</style>
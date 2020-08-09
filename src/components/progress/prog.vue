<template>
  <v-dialog v-model="dialog" persistent width="95vw" max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <!--<v-list-item
          v-bind="attrs"
          v-on="on"
      >
        <v-list-item-icon>
          <v-icon>mdi-radar</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>更新进度</v-list-item-title>
        </v-list-item-content>
      </v-list-item>-->
      <v-btn
          text
          v-bind="attrs"
          v-on="on"
          v-show="max_page"
      >
        UPDATE
      </v-btn>
    </template>
    <v-card class="pa-2">
      <v-card-title class="pb-4">
        <span class="headline">更新 {{ bookname }} 进度</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <!--<v-row justify="center">
            <v-col class="flex-grow-0 flex-shrink-1">
            </v-col>
          </v-row>-->
          <v-row
              class="pt-4"
              justify="space-between"
              align="center"
          >
            <v-slider
                hide-details
                :max="max"
                :min="min"
                v-model="nprogress"
                thumb-label="always"
                prepend-icon="mdi-page-previous-outline"
                append-icon="mdi-page-next-outline"
                @click:append="onmax"
                @click:prepend="onmin"
            >
            </v-slider>
          </v-row>
          <v-row justify="space-between">
            <span class="font-weight-medium text--black">{{ min }} 页</span>
            <span class="font-weight-medium text--black">{{ max }} 页</span>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-dialog v-model="dialog2" persistent width="95vw" max-width="400px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="blue darken-1" text v-bind="attrs" v-on="on">直接输入</v-btn>
          </template>
          <v-card class="pa-2">
            <v-card-title>
              <span class="headline">阅读进度</span>
            </v-card-title>
            <v-card-text>
              <v-text-field
                  ref="progress"
                  v-model="dprogress"
                  :rules="rule"
                  autofocus
                  @keydown.enter="nsendinfo(dprogress,true)"
              >
                <template v-slot:append>
                  <span>页</span>
                </template>
              </v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-btn color="blue darken-1" text @click="close2">关闭</v-btn>
              <v-spacer/>
              <v-btn color="blue darken-1" text @click="nsendinfo(dprogress,true)">保存</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-spacer/>
        <v-btn color="blue darken-1" text @click="close1">关闭</v-btn>
        <v-btn color="blue darken-1" text @click="nsendinfo(nprogress)">保存</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {sendinfo} from '@/components/progress/progress';

export default {
  name: "progressmobile",
  props: ['progress', 'max_page', 'isbn', 'bookname'],
  data() {
    return {
      nprogress: this.progress,
      dprogress: this.progress,
      max: '',
      min: '',
      dialog: false,
      dialog2: false,
      rule: [
        value => !!value || '必填',
        value => {
          return value <= parseInt(this.max_page) || '阅读进度应小于总页数'
        },
        value => (Math.round(value) === parseInt(value) && parseInt(value) >= 0) || '阅读页数应为正整数'
      ]
    }
  },
  created: function () {
    if (this.nprogress > this.max_page || this.nprogress < 0) {
      this.nprogress = 0
    }
    this.max = this.max_page >= this.nprogress + 70 ? this.nprogress + 70 : this.max_page
    this.min = 0 >= this.nprogress - 30 ? 0 : this.nprogress - 30
  },
  methods: {
    sendinfo,
    onmin: function () {
      this.min = this.min - 100 <= 0 ? 0 : this.min - 100;
      this.max = this.min + 100 >= this.max_page ? this.max_page : this.min + 100
    },
    onmax: function () {
      this.max = this.max + 100 >= this.max_page ? this.max_page : this.max + 100;
      this.min = this.max - 100 <= 0 ? 0 : this.max - 100
    },
    nsendinfo: function (progress, validate = false) {
      var that = this
      //console.log(that.isbn)
      if (validate) {
        if (!this.$refs.progress.validate()) {
          return
        } else {
          this.dialog2 = false
        }
      }
      sendinfo(that.isbn, progress).then(function (msg) {
        that.$store.commit('snackbar', {
          'color': 'success',
          'msg': msg
        })
        that.dialog = false
        that.$bus.$emit('refresh', true)
      })
    },
    close1: function () {
      //debugger
      this.dialog = false;
      this.nprogress = this.progress
    },
    close2: function () {
      //debugger
      this.dialog2 = false;
      this.dprogress = this.progress
    }
  }
}
</script>

<style scoped>

</style>
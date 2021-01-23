<template>
  <v-col
      cols="12"
      md="6"
      lg="4"
      :key="key"
  >
    <v-card
        class="ma-md-4 ma-xs-2"
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
            <p
                class="mb-0 pa-4">
              <span
                  class="text-h4 font-weight-medium"
                  :class="[showprogress?'red--text':'blue--text']"
              >{{ book.progress }}</span><span class=""> / </span>{{ book.page_total === '' ? 'NaN' : book.page_total }}
            </p>
          </div>
        </div>
        <v-sheet
            elevation="1"
            width="20%"
            height="30%"
            color="lighten-4 grey"
            class="pa-2 ma-4 align-self-center d-none d-sm-flex"
            :style="{visibility: (showpic?'visable':'hidden')}"
        >

          <v-img
              :aspect-ratio="31/43"
              :src="pic_url"
          />
        </v-sheet>
      </div>
      <v-progress-linear
          height="7px"
          class="mt-1"
          :color="showprogress?'red':'primary'"
          :value="progress_value"
          :striped="showprogress"
      />
      <v-card-actions>
        <v-menu transition="slide-x-transition" offset-x>
          <template #activator="{ on, attrs }">
            <v-btn
                text
                v-bind="attrs"
                v-on="on"
            >
              EDIT
            </v-btn>
          </template>
          <v-list>
            <v-list-item
                @click.stop="udref.dialog=true"
            >
              <v-list-item-icon>
                <v-icon>mdi-pencil</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>修改信息</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider/>
            <v-list-item
                @click.stop="dlref.dialog=true"
            >
              <v-list-item-icon>
                <v-icon color="red darken-1">mdi-delete</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="red--text text--darken-1">删除书籍</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-spacer></v-spacer>
        <prog
            :bookname="book.title"
            :key="book.progress"
            :progress="book.progress"
            :max_page="book.page_total"
            :isbn="book.isbn"
        />
      </v-card-actions>
    </v-card>
    <template v-if="mobile">
      <udmobile
          :book="book"
          ref="ud"
      />
    </template>
    <template v-else>
      <uddesktop
          :book="book"
          ref="ud"
      />
    </template>
    <delete
        ref="dl"
        :isbn="book.isbn"
    />
  </v-col>
</template>

<script>
import {baseurl} from '@/config'

import Udmobile from '@/components/updatedialog/udmobile'
import Uddesktop from '@/components/updatedialog/uddesktop'
import Prog from '@/components/progress/prog'
import Delete from "@/components/delete";


export default {
  name: "bookcard",
  components: {Delete, Prog, Uddesktop, Udmobile},
  props: ['username', 'book'],
  data() {
    return {
      showexpand: false,
      udref:null,
      dlref:null,
    }
  },
  mounted() {
    // console.log('mount')
    this.udref=this.$refs.ud
    this.dlref=this.$refs.dl
  },
  updated() {
    // console.log('update')
    this.udref=this.$refs.ud
    this.dlref=this.$refs.dl
  },
  computed: {
    key: function () {
      return this.book.title + this.book.page_total + this.book.progress + this.book.author_str + this.book.isbn
    },
    pic_url: function () {
      return this.book.pic_url!==''?baseurl + this.book.pic_url:''
    },
    mobile: function () {
      return document.body.clientWidth < 600
    },
    showpic: function (){
      return this.book.pic_url!==''
    },
    progress_value: function () {
      if (this.book.page_total !== '') {
        return this.book.progress / this.book.page_total * 100
        //console.log(this.progress_value)
      } else {
        return 101
      }
    },
    showprogress: function () {
      return this.progress_value > 100
    }
  },
  methods: {
    showsnackbar: function (arg) {
      this.$store.commit('snackbar', arg)
    },
  }
}
</script>

<style scoped>
</style>
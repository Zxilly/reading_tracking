<template>
  <v-col
      cols="12"
      md="6"
      lg="4"
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
            <template v-if="mobile">
              <prog
                  :key="book.progress"
                  :progress="book.progress"
                  :max_page="book.page_total"
                  :isbn="book.isbn"
              />
              <udmobile
                  :book="book"
              />
            </template>
            <template v-else>
              <prog
                  :key="book.progress"
                  :progress="book.progress"
                  :max_page="book.page_total"
                  :isbn="book.isbn"
              />
              <uddesktop
                  :book="book"
              />
            </template>
            <v-divider/>
            <v-list-item
                @click="'console.log(3)'"
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
        <!--<v-btn
            icon
            @click="showexpand = !showexpand"
            v-if="book.tip!==''">
          <v-icon>{{ showexpand ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>-->
      </v-card-actions>
      <!--<v-expand-transition>
        <div v-show="showexpand">
          <v-divider></v-divider>
          <v-card-text style="min-height: 80px">
            {{ book.tip }}
          </v-card-text>
        </div>
      </v-expand-transition>-->
    </v-card>
  </v-col>
</template>

<script>
import {baseurl} from '@/config'

import Udmobile from '@/components/updatedialog/udmobile'
import Uddesktop from '@/components/updatedialog/uddesktop'
import Prog from '@/components/progress/prog'


export default {
  name: "bookcard",
  components: {Prog, Uddesktop, Udmobile},
  props: ['username', 'book'],
  created: function () {
    //console.log(this.mobile)
  },
  data() {
    return {
      showexpand: false,
    }
  },
  computed: {
    pic_url: function () {
      return baseurl + this.book.pic_url
    },
    mobile: function () {
      return document.body.clientWidth < 600
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
    deletecard: function () {

    },
  }
}
</script>

<style scoped>

</style>
<template>
  <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
    <template v-slot:activator="{ on, attrs }">
      <v-list-item
          v-bind="attrs"
          v-on="on"
      >
        <v-list-item-icon>
          <v-icon>mdi-pencil</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>修改信息</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>修改信息</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="dialog = false">保存</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-list>
        <v-list-item class="mt-4">
          <v-list-item-content>
            <v-list-item-title class="mb-1">书名</v-list-item-title>
            <v-text-field
                filled
                v-model="bookname"
            />
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="mb-1">作者</v-list-item-title>
            <v-text-field
                filled
                v-model="author"
            />
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="mt-4">
          <v-list-item-content>
            <v-list-item-title class="mb-1">页数</v-list-item-title>
            <v-text-field
                filled
                v-model="page"
                :rules="rule"
            />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "udmobile",
  props: ['book'],
  data() {
    return {
      dialog: false,
      bookname:this.book.title,
      author:this.book.author_str,
      page:this.book.page_total,
      rule:[
      value => !!value || '必填',
      value => Math.round(value).toString() === value || '阅读页数应为一个数字',
    ],
    }
  }
}
</script>

<style scoped>

</style>
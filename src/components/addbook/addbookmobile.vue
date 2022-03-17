<template>
  <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
          v-bind="attrs"
          v-on="on"
          bottom
          right
          fab
          fixed
          large
          color="primary"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="dialog = false;$emit('reset')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>添加书籍</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="sendinfo">保存</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-list>
        <v-list-item class="mt-4">
          <v-list-item-content>
            <v-list-item-title class="mb-1">ISBN</v-list-item-title>
            <v-text-field
                filled
                ref="isbn"
                v-model="isbn"
                :rules="rules.isbn"
                required
            />
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="mb-1">阅读进度</v-list-item-title>
            <v-text-field
                filled
                ref="progress"
                v-model="progress"
                :rules="rules.progress"
                placeholder="已经读了多少页？"
                required
            />
          </v-list-item-content>
        </v-list-item>
        <!--<v-list-item class="mt-4">
          <v-list-item-content>
            <v-list-item-title class="mb-1">备注</v-list-item-title>
            <v-text-field
                ref="tip"
                filled
                v-model="tip"
            />
          </v-list-item-content>
        </v-list-item>-->
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "AddBookMobile",
  data() {
    return {
      dialog: false,
      isbn: '',
      progress: '',
      tip: ''
    }
  },
  props: ['rules','reset'],
  methods: {
    sendinfo: function () {
      if (this.$refs.isbn.validate() && this.$refs.progress.validate()) {
        this.$emit('addbook', [
          this.isbn, this.progress, this.tip
        ]);
        this.dialog = false
        this.$emit('reset')
      }
    }
  }
}
</script>

<style scoped>

</style>

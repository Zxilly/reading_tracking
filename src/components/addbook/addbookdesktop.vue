<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
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
    <v-card class="pa-2">
      <v-card-title>
        <span class="headline">添加书籍</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                  label="ISBN"
                  ref="isbn"
                  v-model="isbn"
                  :rules="rules.isbn"
                  required/>
            </v-col>
            <v-col cols="12">
              <v-text-field
                  label="阅读进度"
                  ref="progress"
                  v-model="progress"
                  :rules="rules.progress"
                  required/>
            </v-col>
            <!--<v-col cols="12">
              <v-text-field
                  label="备注"
                  ref="tip"
                  v-model="tip"
                  required/>
            </v-col>-->
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog=false;$emit('reset')">关闭</v-btn>
        <v-btn color="blue darken-1" text @click="sendinfo">保存</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "addbookdesktop",
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
      //console.log([this.isbn, this.progress, this.tip])
      this.dialog = false
      if (this.$refs.isbn.validate() && this.$refs.progress.validate()) {
        this.$emit('addbook', [
          this.isbn, this.progress, this.tip
        ]);
        //([this.isbn, this.progress, this.tip] = ['', '', '']);
      }
    }
  }
}
</script>

<style scoped>

</style>
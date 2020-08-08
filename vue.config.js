module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  configureWebpack:{
    externals:{
      'vue':'Vue',
      'vuetify/lib':'Vuetify'
    }
  }
}
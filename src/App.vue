<template>
  <v-app id="app">
    <v-main id="a" class="grey lighten-5">
      <v-app-bar
          app
          dark
          color="blue darken-3"
      >
        <v-btn icon>
          <v-icon>mdi-book-multiple-outline</v-icon>
        </v-btn>
        <v-toolbar-title class="font-weight-light">
          <span class="font-weight-bold">Reading</span> Tracking
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
            icon
        >
          <v-icon @click="refresh">mdi-refresh</v-icon>
        </v-btn>
        <v-menu>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                icon
                v-bind="attrs"
                v-on="on"
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list rounded>
            <v-subheader>About Project</v-subheader>
            <v-list-item-group>
              <v-list-item @click="jumptoblog">
                <v-list-item-icon>
                  <v-icon>mdi-post</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Blog</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item @click="jumptogithub">
                <v-list-item-icon>
                  <v-icon>mdi-github</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Github</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>
      </v-app-bar>
      <v-container v-if="loginStates">
        <v-row
            v-for="n in 6/2"
            :key="n"
            :class="mb-6"
        >
          <v-col
              v-for="k in n + 1"
              :key="k"
          >
            <v-card
                class="pa-2"
                outlined
                tile
            >
              {{ k }} of {{ n + 1 }}
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
//import card from '@/components/card.vue'

export default {
  name: 'App',
  methods: {
    jumptoblog: () => {
      window.open('https://learningman.top', '_blank');
    },
    jumptogithub: () => {
      window.open('https://github.com', '_blank');
    },
    refresh: () => {

    }
  },
  components: {
    //card
  }
}
</script>
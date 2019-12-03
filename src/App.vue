<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      class="header"
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
      </div>
      <v-toolbar-title>CoinCap</v-toolbar-title>

    </v-app-bar>
    <div class="block"></div>

    <v-content>
      <app-coins></app-coins>
    </v-content>
  </v-app>
</template>

<script>

import Coins from './components/Coins';


export default {
  name: 'App',

  components: {
    appCoins: Coins,
  }

};
</script>

<style scoped>
  .header{
    position: relative;
  }
  .block{
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 300px;
    background-color: #2c84e8;
  }
</style>

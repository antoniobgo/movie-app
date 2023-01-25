<script setup>
import router from "./router/index.js";
import logoURL from "./assets/logo.svg";
import { useDisplay } from "vuetify";

const { mdAndUp } = useDisplay();
</script>

<template>
  <v-app>
    <v-app-bar flat color="#032541" height="60">
      <template v-slot:prepend>
        <div
          style="margin-left: 20vw"
          class="d-flex align-center clickable"
          @click="router.push({ name: 'home' })"
        >
          <v-img :src="logoURL" class="app-bar-logo mr-3" width="50" />
          <app-bar-title class="text-color-grey"
            >Overdrive Movie App</app-bar-title
          >
        </div>
      </template>
    </v-app-bar>
    <v-main>
      <div class="w-100 v-container-color h-100">
        <v-container
          fluid
          class="h-100 pa-0"
          :class="mdAndUp ? 'w-75' : 'w-100'"
        >
          <router-view />
        </v-container>
      </div>
    </v-main>
  </v-app>
</template>

<style>
body {
  font-family: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}
.v-container-color {
  background-color: #eaeaea;
}
.clickable {
  cursor: pointer;
}
.text-color-grey {
  color: #fafafa;
}
</style>

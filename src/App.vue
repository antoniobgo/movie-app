<script setup>
import router from "./router/index.js";
import logoURL from "./assets/logo.svg";
import { useDisplay } from "vuetify";

const { mdAndUp } = useDisplay();
</script>

<template>
  <v-app>
    <v-app-bar flat color="#BFC6CE" height="60">
      <template v-slot:prepend>
        <div
          style="margin-left: 20vw"
          class="d-flex align-center clickable"
          @click="router.push({ name: 'home' })"
        >
          <v-img :src="logoURL" class="app-bar-logo mr-3" width="50" />
          <app-bar-title class="text-h5">Movies App</app-bar-title>
        </div>
      </template>
    </v-app-bar>
    <v-main>
      <v-container fluid class="h-100 pa-0" :class="mdAndUp ? 'w-75' : 'w-100'">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<style>
body {
  font-family: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}
.clickable {
  cursor: pointer;
}
</style>

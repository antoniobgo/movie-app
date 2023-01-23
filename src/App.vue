<script setup>
import logoURL from "./assets/logo.svg";
</script>

<template>
  <v-app>
    <v-app-bar flat color="#BFC6CE" height="60">
      <template v-slot:prepend>
        <div style="margin-left: 20vw" class="d-flex align-center">
          <v-img
            @click="router.push({ name: 'home' })"
            :src="logoURL"
            class="app-bar-logo mr-3"
            width="50"
          />
          <app-bar-title class="text-h5">Movies App</app-bar-title>
        </div>
      </template>
    </v-app-bar>
    <v-main>
      <v-container fluid class="h-100 w-75 pa-0">
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
.app-bar-logo {
}
</style>

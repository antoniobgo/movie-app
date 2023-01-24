<script setup>
import { useStore } from "@/store/index";

const store = useStore();
</script>

<template>
  <v-btn
    v-if="store.selectedMovie.isFavorite"
    @click="store.selectedMovie.isFavorite = !store.selectedMovie.isFavorite"
    variant="outlined"
    size="small"
    >remove from favorites</v-btn
  >
  <v-btn
    v-else
    @click="store.selectedMovie.isFavorite = !store.selectedMovie.isFavorite"
    variant="outlined"
    size="small"
    >add to favorites</v-btn
  >
</template>

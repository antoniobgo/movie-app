<script setup>
import { useStore } from "@/store/index";

const store = useStore();
</script>

<template>
  <div class="my-3">
    <v-btn
      v-if="store.selectedMovie.isFavorite"
      @click="store.selectedMovie.isFavorite = !store.selectedMovie.isFavorite"
      variant="outlined"
      size="small"
      width="250"
      prepend-icon="mdi-heart"
      >remove from favorites</v-btn
    >
    <v-btn
      v-else
      @click="store.selectedMovie.isFavorite = !store.selectedMovie.isFavorite"
      variant="outlined"
      width="250"
      size="small"
      prepend-icon="mdi-heart-outline"
      >add to favorites</v-btn
    >
  </div>
</template>
<style></style>

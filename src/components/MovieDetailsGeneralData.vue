<script setup>
import { computed } from "vue";
import AddOrRemoveFromFavoritesButton from "@/components/AddOrRemoveFromFavoritesButton";
import { useStore } from "@/store/index";
import router from "../router/index.js";

const store = useStore();

const genreNames = computed(() => {
  let genres = "";
  if (store.selectedMovie.genreNameList) {
    store.selectedMovie.genreNameList.forEach((name, index) => {
      index === store.selectedMovie.genreNameList.length - 1
        ? (genres += name)
        : (genres += name + ", ");
    });
    return genres;
  } else return "Genre is not avaiable.";
});

const movieOverview = computed(() => {
  return store.selectedMovie.overview
    ? store.selectedMovie.overview
    : "Overview not avaiable.";
});
</script>

<template>
  <div class="mt-5">
    <p class="detailed-title-text">
      {{ store.selectedMovie.original_title }}
    </p>
    <p class="detailed-movie-date-genre ml-1">
      {{ store.selectedMovie.release_date }} - {{ genreNames }}
    </p>
    <p class="overview-title mt-3">Overview</p>
    <p class="overview-text">{{ movieOverview }}</p>
    <div class="d-flex flex-column mt-2">
      <AddOrRemoveFromFavoritesButton class="on-hover-button-effect" />
      <v-btn
        @click="router.push({ name: 'home' })"
        variant="outlined"
        size="small"
        class="on-hover-button-effect"
        width="250"
        >go back</v-btn
      >
    </div>
  </div>
</template>

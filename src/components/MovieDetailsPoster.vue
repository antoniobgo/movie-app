<script setup>
import { useStore } from "@/store/index";

const store = useStore();
</script>

<template>
  <v-img
    height="400px"
    :src="
      'https://image.tmdb.org/t/p/original/' + store.selectedMovie.poster_path
    "
    :lazy-src="
      'https://image.tmdb.org/t/p/original/' + store.selectedMovie.poster_path
    "
    fit
    class="card-image rounded-xl"
  >
    <template v-slot:placeholder>
      <div
        v-if="store.selectedMovie.poster_path"
        class="d-flex align-center justify-center fill-height"
      >
        <v-progress-circular color="grey-lighten-4" indeterminate>
        </v-progress-circular>
      </div>
      <div else class="d-flex align-center justify-center fill-height">
        <p>Poster not avaiable</p>
      </div>
    </template></v-img
  >
</template>

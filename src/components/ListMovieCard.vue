<script setup>
import { defineProps } from "vue";

const props = defineProps(["movie"]);
</script>

<template>
  <v-card class="rounded-lg" height="400" width="200">
    <!--TODO: convert genre ids into corresponding string-->
    <!-- aspect-ratio="4/3" -->
    <v-img
      height="280px"
      :src="'https://image.tmdb.org/t/p/original/' + movie.poster_path"
      :lazy-src="'https://image.tmdb.org/t/p/original/' + movie.poster_path"
      cover
      class="card-image"
    >
      <template v-slot:placeholder>
        <div class="d-flex align-center justify-center fill-height">
          <v-progress-circular color="grey-lighten-4" indeterminate>
          </v-progress-circular></div></template
    ></v-img>
    <div class="margin-left">
      <v-btn icon class="like-button-position" flat border>
        <v-icon color="red">mdi-heart</v-icon>
      </v-btn>
      <div class="like-button-position">
        <p class="movie-title-text mx-1 mt-2">{{ movie.original_title }}</p>
        <p class="genre-text mx-1">Comédia, drama.</p>
        <p class="genre-text mx-1">{{ movie.release_date }}</p>
      </div>
    </div>
  </v-card>
</template>

<style>
.card-image {
  background-size: auto 100% !important;
}
.movie-title-text {
  font-size: 14px;
  font-weight: 700;
}
.genre-text {
  font-size: 12px;
  font-weight: 300;
}
.like-button-position {
  position: relative;
  bottom: 19px;
}
.margin-left {
  margin-left: 10%;
}
</style>

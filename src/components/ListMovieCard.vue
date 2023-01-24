<script setup>
import { defineProps, ref, computed } from "vue";
import { useStore } from "@/store/index";
import router from "../router/index.js";
import DetailedMovieCard from "@/components/ListMovieCard";

const store = useStore();

//TODO verificar se tem necessidade dessa atribuiçao
const props = defineProps(["movie", "index"]);

const onFavoriteButtonClick = () => {
  if (store.upcomingMovies[props.index].isFavorite) {
    store.upcomingMovies[props.index].isFavorite = false;
  } else {
    store.upcomingMovies[props.index].isFavorite = true;
  }
};

const onSelectedMovieClick = () => {
  store.selectedMovie = props.movie;
  router.push("movie-details");
};

const genreNames = computed(() => {
  let genres = "";
  if (props.movie.genreNameList)
    props.movie.genreNameList.forEach((name, index) => {
      index === props.movie.genreNameList.length - 1
        ? (genres += name)
        : (genres += name + ", ");
    });
  return genres;
});
</script>

<template>
  <v-card class="rounded-lg" height="400" width="200">
    <!--TODO: convert genre ids into corresponding string-->
    <!-- aspect-ratio="4/3" -->
    <v-img
      @click="onSelectedMovieClick"
      height="280px"
      :src="'https://image.tmdb.org/t/p/original/' + movie.poster_path"
      :lazy-src="'https://image.tmdb.org/t/p/original/' + movie.poster_path"
      cover
      class="card-image"
    >
      <template v-slot:placeholder>
        <div
          v-if="movie.poster_path"
          class="d-flex align-center justify-center fill-height"
        >
          <v-progress-circular color="grey-lighten-4" indeterminate>
          </v-progress-circular></div></template
    ></v-img>
    <div class="margin-left">
      <v-btn
        @click="onFavoriteButtonClick"
        icon
        class="like-button-position"
        flat
        border
      >
        <v-icon v-if="store.upcomingMovies[props.index].isFavorite" color="red"
          >mdi-heart</v-icon
        >
        <v-icon v-else>mdi-heart-outline</v-icon>
      </v-btn>
      <div class="like-button-position">
        <p class="movie-title-text mx-1 mt-2" @click="onSelectedMovieClick">
          {{ movie.original_title }}
        </p>
        <p class="genre-text mx-1">{{ genreNames }}</p>
        <p class="genre-text mx-1">{{ movie.release_date }}</p>
      </div>
    </div>
  </v-card>
</template>

<style scoped>
.card-image {
  background-size: auto 100% !important;
}
.card-image:hover {
  cursor: pointer;
}
.movie-title-text {
  font-size: 14px;
  font-weight: 700;
}
.movie-title-text:hover {
  cursor: pointer;
  color: rgb(1, 180, 228);
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

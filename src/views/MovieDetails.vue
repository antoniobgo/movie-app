<script setup>
import { onBeforeMount, ref, computed } from "vue";
import router from "../router/index.js";
import { useStore } from "@/store/index";
import AddOrRemoveFromFavoritesButton from "@/components/AddOrRemoveFromFavoritesButton";
import MovieDetailsPoster from "@/components/MovieDetailsPoster";

const store = useStore();

onBeforeMount(() => {
  if (JSON.stringify(store.selectedMovie) === "{}")
    router.push({ name: "home" });
  window.scrollTo({ top: 0 });
});

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
  <v-container class="padding-top card-container">
    <v-row justify="center">
      <v-col cols="10" md="6" lg="3">
        <MovieDetailsPoster />
      </v-col>
      <v-col cols="10" md="6" lg="5">
        <div class="mt-5">
          <p class="detailed-title-text">
            {{ store.selectedMovie.original_title }}
          </p>
          <p class="detailed-movie-date-genre">
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
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.padding-top {
  padding-top: 10rem;
}
.detailed-title-text {
  font-size: 30px;
  font-weight: 700;
  line-height: 33px;
}
.detailed-movie-date-genre {
  font-size: 13px;
  margin-right: 1px;
}
.overview-title {
  font-size: 21px;
  font-weight: 500;
}
.overview-text {
  font-size: 16px;
}
</style>

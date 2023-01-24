<script setup>
import { onBeforeMount, ref, computed } from "vue";
import router from "../router/index.js";
import { useStore } from "@/store/index";
import AddOrRemoveFromFavoritesButton from "@/components/AddOrRemoveFromFavoritesButton";

const store = useStore();

onBeforeMount(() => {
  if (JSON.stringify(store.selectedMovie) === "{}")
    router.push({ name: "home" });
  window.scrollTo({ top: 0 });
});

const getGenresNames = () => {
  let genreString = "";
  store.selectedMovie.genre_ids.forEach((genre_id) => {
    switch (genre_id) {
      case 28:
        genreString += "Action, ";
        break;
    }
  });
};

const onFavoriteButtonClick = () => {};

const genreNames = computed(() => {
  let genres = "";
  if (store.selectedMovie.genreNameList)
    store.selectedMovie.genreNameList.forEach((name, index) => {
      index === store.selectedMovie.genreNameList.length - 1
        ? (genres += name)
        : (genres += name + ", ");
    });
  return genres;
});
</script>

<template>
  <v-container class="margin-top">
    <v-row justify="center">
      <v-col cols="10" md="6" lg="3">
        <v-img
          height="400px"
          :src="
            'https://image.tmdb.org/t/p/original/' +
            store.selectedMovie.poster_path
          "
          :lazy-src="
            'https://image.tmdb.org/t/p/original/' +
            store.selectedMovie.poster_path
          "
          fit
          class="card-image rounded-xl"
        >
          <template v-slot:placeholder>
            <div class="d-flex align-center justify-center fill-height">
              <v-progress-circular color="grey-lighten-4" indeterminate>
              </v-progress-circular></div></template
        ></v-img>
      </v-col>
      <v-col cols="10" md="6" lg="5" align-self="center">
        <div>
          <h2>{{ store.selectedMovie.original_title }}</h2>
          <h5>{{ store.selectedMovie.overview }}</h5>
          <p>Release date: {{ store.selectedMovie.release_date }}</p>
          <p>{{ genreNames }}</p>
          <div class="mt-2">
            <AddOrRemoveFromFavoritesButton />
            <v-btn
              @click="router.push({ name: 'home' })"
              variant="outlined"
              size="small"
              class="ml-4"
              >back to upcoming movies</v-btn
            >
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
.margin-top {
  margin-top: 10rem;
}
</style>

<script setup>
import { onBeforeMount, onMounted, ref, watch, computed } from "vue";
import { useDisplay } from "vuetify";
import { useStore } from "@/store/index";
import router from "../router/index.js";
import MovieService from "@/services/movie.service";
import ListMovieCard from "@/components/ListMovieCard";

const store = useStore();
const { mdAndUp } = useDisplay();

const currentPageMovies = ref([]);
const isFavoriteViewSelected = ref(false);
const selectedSearchMovie = ref();

const getAndSaveGenresObject = () => {
  MovieService.getGenresMoviesList().then((response) => {
    store.genreList = response.data.genres;
  });
};

const populateUpcomingMoviesWithGenreNameList = () => {
  store.upcomingMovies.forEach((movie) => {
    let genreNameList = [];
    movie.genre_ids.forEach((genre_id) => {
      store.genreList.forEach((genreObject) => {
        if (genreObject.id === genre_id) genreNameList.push(genreObject.name);
      });
    });
    movie.genreNameList = genreNameList;
  });
};

onBeforeMount(() => {
  getAndSaveGenresObject();
  if (!store.upcomingMovies.length > 0) {
    MovieService.getUpcomingMovies(1).then((response) => {
      store.upcomingMovies = response.data.results;
      MovieService.getUpcomingMovies(2).then((response) => {
        store.upcomingMovies = store.upcomingMovies.concat(
          response.data.results
        );
        MovieService.getUpcomingMovies(3).then((response) => {
          store.upcomingMovies = store.upcomingMovies.concat(
            response.data.results.slice(0, 10)
          );
        });
      });
      populateUpcomingMoviesWithGenreNameList();
    });
  }
});

const selectedViewTitle = computed(() => {
  return isFavoriteViewSelected.value
    ? "Your Favorite Movies List"
    : "Upcoming Movies";
});

const onChangeViewClick = () => {
  isFavoriteViewSelected.value = !isFavoriteViewSelected.value;
  isFavoriteViewSelected.value
    ? (currentPageMovies.value = store.favoriteMovies)
    : (currentPageMovies.value = store.upcomingMovies);
};

watch(selectedSearchMovie, (n) => {
  store.selectedMovie = selectedSearchMovie.value;
  router.push("movie-details");
});
</script>

<template>
  <div>
    <div class="d-flex justify-center">
      <h1 class="title-margin">{{ selectedViewTitle }}</h1>
    </div>
    <v-row dense justify="space-between">
      <v-col cols="11" md="5" lg="3">
        <v-btn
          v-if="isFavoriteViewSelected"
          @click="onChangeViewClick"
          variant="outlined"
        >
          check upcoming
        </v-btn>
        <v-btn v-else @click="onChangeViewClick" variant="outlined">
          check favorites
        </v-btn>
      </v-col>
      <v-col cols="11" md="5" lg="3">
        <v-autocomplete
          v-model="selectedSearchMovie"
          label="Search for upcoming movies"
          :items="store.upcomingMovies"
          variant="outlined"
          density="compact"
          prepend-inner-icon="mdi-magnify"
          return-object
        >
        </v-autocomplete>
      </v-col>
    </v-row>
    <v-row justify="center" class="movie-list-margin mb-16">
      <div
        v-if="!isFavoriteViewSelected"
        v-for="(movie, index) in store.upcomingMovies"
        :key="movie.id"
      >
        <v-col cols="8" md="6" lg="2">
          <ListMovieCard :movie="movie" :index="index"
        /></v-col>
      </div>
      <div
        v-else
        v-for="(movie, index) in store.upcomingMovies"
        :key="movie.id"
      >
        <v-col v-if="movie.isFavorite" cols="8" md="6" lg="2">
          <ListMovieCard :movie="movie" :index="index"
        /></v-col>
      </div>
    </v-row>
  </div>
</template>

<style scoped>
.movie-list-margin {
  /* margin-top: 10rem; */
}
.title-margin {
  margin: 5rem 0 5rem 0;
}
</style>

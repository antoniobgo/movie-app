<script setup>
import { onBeforeMount, onMounted, ref, watch, computed } from "vue";
import { useDisplay } from "vuetify";
import { useStore } from "@/store/index";
import router from "../router/index.js";
import MovieService from "@/services/movie.service";
import ListMovieCard from "@/components/ListMovieCard";

const store = useStore();
const { mdAndUp } = useDisplay();

const isFavoriteViewSelected = ref(false);
const selectedSearchMovie = ref();
const isLoadingData = ref(false);
const apiResponseError = ref(false);

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
  isLoadingData.value = true;
  getAndSaveGenresObject();
  if (store.upcomingMovies.length === 50) isLoadingData.value = false;
  else {
    MovieService.getUpcomingMovies(1)
      .then((response) => {
        store.upcomingMovies = response.data.results;
        MovieService.getUpcomingMovies(2)
          .then((response) => {
            store.upcomingMovies = store.upcomingMovies.concat(
              response.data.results
            );
            MovieService.getUpcomingMovies(3)
              .then((response) => {
                store.upcomingMovies = store.upcomingMovies.concat(
                  response.data.results.slice(0, 10)
                );
              })
              .catch((response) => {
                apiResponseError.value = true;
              });
          })
          .catch((response) => {
            apiResponseError.value = true;
          });
        populateUpcomingMoviesWithGenreNameList();
        isLoadingData.value = false;
        if (apiResponseError.value) apiResponseError.value = false;
      })
      .catch((response) => {
        apiResponseError.value = true;
      });
  }
});

const selectedViewTitle = computed(() => {
  return isFavoriteViewSelected.value ? "Favorite Movies" : "Upcoming Movies";
});

// const isFavoriteListNotEmpty = computed(() => {
//   debugger;
//   let favoriteCounter = 0;
//   store.upcomingMovies.forEach((movie) => {
//     if (movie.isFavorite) favoriteCounter++;
//   });
//   debugger;
//   return favoriteCounter > 0;
// });

const onChangeViewClick = () => {
  isFavoriteViewSelected.value = !isFavoriteViewSelected.value;
};

watch(selectedSearchMovie, () => {
  store.selectedMovie = selectedSearchMovie.value;
  router.push("movie-details");
});
</script>

<template>
  <div v-if="!isLoadingData">
    <v-row dense class="pt-15" :justify="mdAndUp ? 'start' : 'center'">
      <v-col cols="11" md="5" lg="3">
        <div
          class="d-flex"
          :class="mdAndUp ? 'justify-start' : 'justify-center'"
        >
          <h1 class="title-margin">{{ selectedViewTitle }}</h1>
        </div>
        <v-btn
          class="on-hover-button-effect"
          v-if="isFavoriteViewSelected"
          @click="onChangeViewClick"
          variant="outlined"
        >
          check upcoming
        </v-btn>
        <v-btn
          v-else
          @click="onChangeViewClick"
          class="on-hover-button-effect"
          variant="outlined"
        >
          check favorites
        </v-btn>
        <v-autocomplete
          v-if="!isFavoriteViewSelected"
          v-model="selectedSearchMovie"
          label="Search for upcoming movies"
          :items="store.upcomingMovies"
          variant="outlined"
          density="compact"
          prepend-inner-icon="mdi-magnify"
          return-object
          hide-details
          class="mt-3"
          :class="mdAndUp ? '' : 'mb-3'"
        >
        </v-autocomplete>
      </v-col>
    </v-row>
    <v-row
      :justify="mdAndUp ? 'start' : 'center'"
      class="movie-list-margin mb-16 mt-0"
    >
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
        <!-- <div v-if="isFavoriteListNotEmpty"> -->
        <v-col v-show="movie.isFavorite" cols="8" md="6" lg="2">
          <ListMovieCard :movie="movie" :index="index"
        /></v-col>
        <!-- </div> -->
      </div>
      <!-- <div v-else>
        <p class="empty-list-text mt-15">
          Your favorite list is empty. <a href="/">Go back</a> to favorite some
          movies.
        </p>
      </div> -->
    </v-row>
  </div>
  <div v-else class="d-flex align-center justify-center fill-height">
    <v-progress-circular color="grey-lighten-4" size="70" indeterminate>
    </v-progress-circular>
  </div>
</template>

<style>
.movie-list-margin {
  /* margin-top: 10rem; */
}
.title-margin {
  margin-bottom: 12px;
}
.on-hover-button-effect:hover {
  color: rgb(1, 180, 228);
}
.empty-list-text {
  font-size: 20px;
}
</style>

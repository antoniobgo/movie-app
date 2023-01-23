<script setup>
import { onBeforeMount, ref, watch } from "vue";
import { useDisplay } from "vuetify";
import { useStore } from "@/store/index";
import MovieService from "@/services/movie.service";
import ListMovieCard from "@/components/ListMovieCard";
import MoviesPagination from "@/components/MoviesPagination";

const store = useStore();
const { mdAndUp } = useDisplay();

const currentPageMovies = ref([]);

onBeforeMount(() => {
  MovieService.getUpcomingMovies()
    .then((response) => {
      //
      store.upcomingMovies = response.data.results;
      currentPageMovies.value = store.upcomingMovies;
    })
    .catch((response) => {
      debugger;
    });
});

const getNewSelectedPageData = (selectedPage) => {
  MovieService.getUpcomingMovies(selectedPage)
    .then((response) => {
      //
      store.upcomingMovies = response.data.results;
      currentPageMovies.value = store.upcomingMovies;
    })
    .catch((response) => {
      debugger;
    });
  window.scrollTo({ top: 0, behavior: "smooth" });
};

watch(
  () => store.selectedPage,
  (selectedPage) => {
    getNewSelectedPageData(selectedPage);
  }
);
</script>

<template>
  <div class="d-flex justify-center">
    <h1 class="title-margin">Upcoming Movies</h1>
  </div>
  <v-row
    :justify="mdAndUp ? 'start' : 'center'"
    class="movie-list-margin mb-16"
  >
    <v-col cols="8" md="6" lg="2" v-for="movie in currentPageMovies">
      <ListMovieCard :movie="movie"
    /></v-col>
  </v-row>
  <MoviesPagination class="mb-15"></MoviesPagination>
</template>

<style scope>
.movie-list-margin {
  /* margin-top: 10rem; */
}
.title-margin {
  margin: 5rem 0 5rem 0;
}
</style>

import { defineStore } from "pinia";
import { ref } from "vue";

export const useStore = defineStore("movies", () => {
  const upcomingMovies = ref([]);
  const favoriteMovies = ref([]);
  const selectedPage = ref(1);
  const selectedMovie = ref({});
  const genreList = ref([]);
  return {
    upcomingMovies,
    selectedPage,
    favoriteMovies,
    selectedMovie,
    genreList,
  };
});

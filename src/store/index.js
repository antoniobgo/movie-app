import { defineStore } from "pinia";
import { ref } from "vue";

export const useStore = defineStore("movies", () => {
  const upcomingMovies = ref([]);
  const selectedPage = ref(1);

  return {
    upcomingMovies,
    selectedPage,
  };
});

<script setup>
import { onBeforeMount, ref, computed } from "vue";
import { useDisplay } from "vuetify";
import router from "../router/index.js";
import { useStore } from "@/store/index";

import MovieDetailsPoster from "@/components/MovieDetailsPoster";
import MovieDetailsGeneralData from "@/components/MovieDetailsGeneralData";

const store = useStore();
const { mdAndUp } = useDisplay();

onBeforeMount(() => {
  if (JSON.stringify(store.selectedMovie) === "{}")
    router.push({ name: "home" });
  window.scrollTo({ top: 0 });
});
</script>

<template>
  <v-container :class="mdAndUp ? 'padding-top' : 'pt-10'">
    <v-row justify="center">
      <v-col cols="10" md="6" lg="3" class="pr-0 mr-0">
        <MovieDetailsPoster />
      </v-col>
      <v-col cols="10" md="6" lg="5" class="pl-0 ml-0">
        <MovieDetailsGeneralData />
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
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

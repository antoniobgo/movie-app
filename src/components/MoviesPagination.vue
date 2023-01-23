<script setup>
import { ref } from "vue";
import { useStore } from "@/store/index";

const store = useStore();

const pageQuantity = (maxMovieCount = 50) => {
  return parseInt(maxMovieCount / 20) + 1;
};

const changeSelectedPage = (newPageIndex) => {
  store.selectedPage = newPageIndex;
};
</script>

<template>
  <div class="d-flex justify-center">
    <v-btn
      v-for="pageIndex in pageQuantity()"
      variant="outlined"
      class="mx-1"
      size="small"
      @click="changeSelectedPage(pageIndex)"
    >
      {{ pageIndex }}
    </v-btn>
  </div>
</template>

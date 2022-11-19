<template>
  <v-container>
    <v-overlay :opacity="1" :value="overlay">
      <v-progress-circular indeterminate size="64"> Loading... </v-progress-circular>
    </v-overlay>
    <v-pagination v-model="pageNumber" @input="fetchArticles" :length="totalPageNumber" :total-visible="7" circle></v-pagination>
  </v-container>
</template>

<script>
export default {
  name: "homePage",
  data: () => ({
    overlay: true,
    article: [],
    pageNumber: 1,
    totalPageNumber: 1,
    tags: [],
  }),
  computed: {},
  mounted() {
    this.fetchArticles();
    // this.fetchTags();
  },
  methods: {
    async fetchArticles() {
      try {
        this.overlay = true;
        const response = await fetch("https://api.realworld.io/api/articles?limit=10" + "&offset=" + (this.pageNumber - 1) * 10, {
          method: "GET",
          // authorization: "Token " + this.userToken,
          headers: {
            "content-type": "application/json",
          },
        });
        console.log("response***:", response);
        const responseData = await response.json();
        console.log("responseData:", responseData);
        this.totalPageNumber = Math.ceil(responseData.articlesCount / 10);
        this.article = responseData.articles;
        console.log("this.totalPageNumber:", this.totalPageNumber);
      } catch (e) {
        console.log("error:", e);
      } finally {
        this.overlay = false;
      }
    },
  },
  watch: {
    // pageNumber: function (val) {
    //   console.log("val:", val);
    //   this.fetchArticles();
    // },
  },
};
</script>

<style scoped></style>

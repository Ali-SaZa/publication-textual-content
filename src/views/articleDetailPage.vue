<template>
  <div>
    <v-overlay :opacity="1" :value="overlay">
      <v-progress-circular indeterminate size="64"> Loading... </v-progress-circular>
    </v-overlay>
    <ArticleItemComponent
      v-if="!overlay"
      :author="author"
      :createdAt="createdAt"
      :title="title"
      :body="body"
      :description="description"
      :favorited.sync="favorited"
      :favoritesCount="favoritesCount"
      :slug="slug"
      :tagList="tagList"
      :readMoreStatus="true"
      class="mb-3"
    />
  </div>
</template>

<script>
import ArticleItemComponent from "@/components/ArticleItemComponent";

export default {
  name: "articleDetailPage",
  components: { ArticleItemComponent },
  data: () => ({
    overlay: true,
    author: {},
    createdAt: "",
    title: "",
    body: "",
    description: "",
    favorited: false,
    favoritesCount: 0,
    tagList: [],
    slug: "",
  }),
  computed: {
    userToken() {
      return this.$store.getters.token;
    },
  },
  mounted() {
    // console.log("rrr:", this.$route.params.id);
    this.fetchArticles();
  },
  methods: {
    async fetchArticles() {
      try {
        this.overlay = true;
        const response = await fetch("https://api.realworld.io/api/articles/" + this.$route.params.id, {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        });
        const responseData = await response.json();
        this.author = responseData.article.author;
        this.createdAt = responseData.article.createdAt;
        this.title = responseData.article.title;
        this.body = responseData.article.body;
        this.description = responseData.article.description;
        this.favorited = responseData.article.favorited;
        this.favoritesCount = responseData.article.favoritesCount;
        this.tagList = responseData.article.tagList;
      } catch (e) {
        console.log("error:", e);
      } finally {
        this.overlay = false;
      }
    },
  },
};
</script>

<style scoped></style>

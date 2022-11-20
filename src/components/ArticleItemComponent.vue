<template>
  <v-card class="mx-auto" min-width="300" max-width="100%">
    <div class="d-flex justify-space-between align-center pa-4">
      <div class="d-flex align-center">
        <v-avatar size="32px">
          <img alt="Avatar" :src="author.image" />
        </v-avatar>
        <div class="ms-1">
          <div class="teal--text text-subtitle-2">
            {{ author.username }}
          </div>
          <div class="text--secondary text-subtitle-2">
            {{ createdAt | moment("MMMM D, YYYY") }}
          </div>
        </div>
      </div>
      <div :class="[favorited ? 'favorited' : '', favoritesButtonLoading ? 'loading-favorite-box' : '', 'favorite-box']" @click.self="onFavorite">
        <v-icon small color="teal"> mdi-heart </v-icon>
        {{ favoritesCount }}
      </div>
    </div>
    <div class="pa-4 pb-1 text-h6">
      {{ title }}
    </div>
    <v-card-text class="pt-0">
      {{ description }}
    </v-card-text>
    <v-card-actions class="d-flex justify-space-between align-center pr-3">
      <v-btn text color="teal accent-4 text-capitalize"> Read More </v-btn>
      <div>
        <v-chip color="gray" v-for="(tag, index) in tagList" :key="index" class="ma-1" @click.prevent="clickOnTag(tag)">
          {{ tag }}
        </v-chip>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "ArticleItemComponent",
  props: {
    author: Object,
    createdAt: String,
    title: String,
    body: String,
    description: String,
    favorited: Boolean,
    favoritesCount: Number,
    tagList: Array,
    slug: String,
  },
  data: () => ({
    favoritesButtonLoading: false,
  }),
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    userToken() {
      return this.$store.getters.token;
    },
  },
  methods: {
    clickOnTag(tag) {
      this.$emit("clickOnTag", tag);
    },
    async onFavorite() {
      try {
        if (this.isLoggedIn) {
          if (!this.favorited) {
            this.favoritesButtonLoading = true;
            await fetch("https://api.realworld.io/api/articles/" + this.slug + "/favorite", {
              method: "POST",
              headers: {
                "content-type": "application/json",
                authorization: "Token " + this.userToken,
              },
            });
            this.$emit("update:favorited", true);
          } else {
            this.favoritesButtonLoading = true;
            await fetch("https://api.realworld.io/api/articles/" + this.slug + "/favorite", {
              method: "DELETE",
              headers: {
                "content-type": "application/json",
                authorization: "Token " + this.userToken,
              },
            });
            this.$emit("update:favorited", false);
          }
        } else {
          await this.$router.push("/register");
        }
      } catch (e) {
        alert(e);
      } finally {
        this.favoritesButtonLoading = false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.favorite-box {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px;
  width: 53px;
  height: 27px;
  border: 1px solid teal;
  color: teal;
  font-size: 12px;
  border-radius: 4px;
  cursor: pointer;
  &:hover,
  &.favorited {
    background-color: teal;
    color: white;
    .v-icon {
      color: white !important;
    }
  }
  &.loading-favorite-box {
    cursor: not-allowed;
  }
}
.v-chip {
  cursor: pointer;
}
</style>

<template>
  <v-container>
    <v-row class="flex-md-row-reverse">
      <v-col cols="12" md="3">
        <div class="tags-container">
          <div class="subtitle-1">Popular Tags</div>
          <div class="d-flex flex-wrap" v-if="tagsLoading">
            <v-skeleton-loader v-for="index in 8" :key="index" boilerplate class="ma-1" type="chip" width="100px"></v-skeleton-loader>
          </div>
          <v-chip color="gray" v-for="(tag, index) in tags" :key="index" class="ma-1" @click="filter(tag)">
            {{ tag }}
          </v-chip>
        </div>
      </v-col>
      <v-col cols="12" md="9">
        <v-card>
          <v-tabs v-model="tab" background-color="teal lighten-3" dark>
            <v-tab v-for="(tab, indexTab) in tabs" :key="indexTab" class="text-capitalize"> # {{ tab }} </v-tab>
          </v-tabs>
          <v-card-text>
            <template v-if="articlesLoading">
              <div v-for="indexNumber in 10" :key="indexNumber">
                <v-skeleton-loader v-bind="attrs" type="article, actions"></v-skeleton-loader>
              </div>
            </template>
            <template v-else>
              <div v-if="!activeArticles.length" class="empty-data-box">No articles are here... yet.</div>
              <ArticleItemComponent
                v-else
                v-for="articleItem in activeArticles"
                :key="articleItem.slug"
                :author="articleItem.author"
                :createdAt="articleItem.createdAt"
                :title="articleItem.title"
                :body="articleItem.body"
                :description="articleItem.description"
                :favorited.sync="articleItem.favorited"
                :favoritesCount="articleItem.favoritesCount"
                :slug="articleItem.slug"
                :tagList="articleItem.tagList"
                class="mb-3"
                @clickOnTag="
                  (tag) => {
                    filter(tag);
                  }
                "
              />
            </template>
            <!-- if user is logged in-->
            <template v-if="isLoggedIn">
              <v-pagination
                v-if="tab === 0 && userTotalPageNumber > 0"
                v-model="userPageNumber"
                @input="fetchArticles"
                :length="userTotalPageNumber"
                :total-visible="7"
                circle
              ></v-pagination>
              <v-pagination v-if="tab === 1" v-model="pageNumber" @input="fetchArticles" :length="totalPageNumber" :total-visible="7" circle></v-pagination>
              <v-pagination
                v-if="tab === 2"
                v-model="filteredPageNumber"
                @input="fetchArticles"
                :length="filteredTotalPageNumber"
                :total-visible="7"
                circle
              ></v-pagination>
            </template>
            <!-- if user is guest-->
            <template v-if="!isLoggedIn">
              <v-pagination
                v-if="tab"
                v-model="filteredPageNumber"
                @input="fetchArticles"
                :length="filteredTotalPageNumber"
                :total-visible="7"
                circle
              ></v-pagination>
              <v-pagination v-else v-model="pageNumber" @input="fetchArticles" :length="totalPageNumber" :total-visible="7" circle></v-pagination>
            </template>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ArticleItemComponent from "@/components/ArticleItemComponent";
export default {
  name: "homePage",
  components: { ArticleItemComponent },
  data: () => ({
    attrs: {
      class: "mb-6",
      boilerplate: true,
      elevation: 2,
    },
    articles: [],
    pageNumber: 1,
    totalPageNumber: 1,
    filteredArticles: [],
    filteredPageNumber: 1,
    filteredTotalPageNumber: 1,
    userArticles: [],
    userPageNumber: 1,
    userTotalPageNumber: 1,
    tags: [],
    tab: null,
    tabs: ["Global Feed"],
    articlesLoading: true,
    tagsLoading: true,
  }),
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    activeArticles() {
      if (this.isLoggedIn) {
        if (this.tab === 0) {
          return this.userArticles;
        }
        if (this.tab === 1) {
          return this.articles;
        }
        if (this.tab === 2) {
          return this.filteredArticles;
        }
      } else {
        if (this.tab === 1) {
          return this.filteredArticles;
        }
        return this.articles;
      }
    },
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    userToken() {
      return this.$store.getters.token;
    },
  },
  mounted() {
    this.fetchArticles();
    this.fetchTags();
    if (this.isLoggedIn) {
      this.tabs.unshift("Your Feed");
      this.fetchUserArticles();
    }
  },
  methods: {
    async fetchArticles() {
      try {
        this.articlesLoading = true;
        let headers = {};
        if (this.isLoggedIn) {
          headers = {
            "content-type": "application/json",
            authorization: "Token " + this.userToken,
          };
        } else {
          headers = {
            "content-type": "application/json",
          };
        }
        const response = await fetch("https://api.realworld.io/api/articles?limit=10" + "&offset=" + (this.pageNumber - 1) * 10, {
          method: "GET",
          headers: headers,
        });
        const responseData = await response.json();
        this.totalPageNumber = Math.ceil(responseData.articlesCount / 10);
        this.articles = responseData.articles;
      } catch (e) {
        console.log("error:", e);
      } finally {
        this.articlesLoading = false;
      }
    },
    async fetchFilteredArticles(tag) {
      try {
        this.articlesLoading = true;
        let headers = {};
        if (this.isLoggedIn) {
          headers = {
            "content-type": "application/json",
            authorization: "Token " + this.userToken,
          };
        } else {
          headers = {
            "content-type": "application/json",
          };
        }
        const response = await fetch("https://api.realworld.io/api/articles?limit=10" + "&offset=" + (this.filteredPageNumber - 1) * 10 + "&tag=" + tag, {
          method: "GET",
          headers: headers,
        });
        const responseData = await response.json();
        this.filteredTotalPageNumber = Math.ceil(responseData.articlesCount / 10);
        this.filteredArticles = responseData.articles;
      } catch (e) {
        console.log("error:", e);
      } finally {
        this.articlesLoading = false;
      }
    },
    async fetchUserArticles() {
      try {
        this.articlesLoading = true;
        const response = await fetch("https://api.realworld.io/api/articles/feed?limit=10" + "&offset=" + (this.userPageNumber - 1) * 10, {
          method: "GET",
          headers: {
            "content-type": "application/json",
            authorization: "Token " + this.userToken,
          },
        });
        const responseData = await response.json();
        this.userTotalPageNumber = Math.ceil(responseData.articlesCount / 10);
        this.userArticles = responseData.articles;
      } catch (e) {
        console.log("error:", e);
      } finally {
        this.articlesLoading = false;
      }
    },
    async fetchTags() {
      try {
        this.tagsLoading = true;
        const response = await fetch("https://api.realworld.io/api/tags", {
          method: "GET",
          // authorization: "Token " + this.userToken,
          headers: {
            "content-type": "application/json",
          },
        });
        const responseData = await response.json();
        this.tags = responseData.tags;
      } catch (e) {
        console.log("error:", e);
      } finally {
        this.tagsLoading = false;
      }
    },
    async filter(tag) {
      try {
        if (this.isLoggedIn) {
          if (this.tabs.length > 2) {
            this.tabs.pop();
            this.tabs.push(tag);
          } else {
            this.tabs.push(tag);
          }
          this.tab = 2;
        } else {
          if (this.tabs.length > 1) {
            this.tabs.pop();
            this.tabs.push(tag);
          } else {
            this.tabs.push(tag);
          }
          this.tab = 1;
        }
        await this.fetchFilteredArticles(tag);
      } catch (e) {
        alert(e);
      }
    },
  },
  watch: {},
};
</script>

<style scoped lang="scss">
.empty-data-box {
  height: 150px;
  padding: 15px;
}
.tags-container {
  padding: 5px 10px 10px 10px;
  background: #f3f3f3;
  border-radius: 4px;
  .v-chip {
    cursor: pointer;
  }
}
.v-tab {
  color: black !important;
}
.v-card__text {
  padding: 0 !important;
}
</style>
<style lang="scss">
.v-tabs-slider-wrapper {
  height: 5px !important;
  .v-tabs-slider {
    color: black !important;
  }
}
</style>

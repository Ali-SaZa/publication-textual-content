<template>
  <v-form v-model="valid" @submit.prevent="addArticle">
    <v-container>
      <v-row justify="center" align="center" class="mt-3">
        <v-col cols="12" class="text-center text-h4"> Your Settings</v-col>
        <v-col cols="12" md="7">
          <v-text-field v-model="title" label="Article Title" name="title" :rules="fieldRequiredRule"></v-text-field>
        </v-col>
        <v-col cols="12" md="7">
          <v-text-field v-model="body" label="Body" name="body" placeholder="What is this article about?" :rules="fieldRequiredRule"></v-text-field>
        </v-col>
        <v-col cols="12" md="7">
          <v-text-field v-model="description" label="Bio" name="bio" placeholder="Write your article" :rules="fieldRequiredRule"></v-text-field>
        </v-col>
        <v-col cols="12" md="7">
          <v-combobox v-model="tagList" :items="items" label="Tags" name="tags" placeholder="Enter tags" multiple chips></v-combobox>
        </v-col>
        <v-col cols="12" md="7" class="text-right">
          <v-btn color="green" class="text-capitalize white--text" :disabled="!valid" depressed x-large type="submit" :loading="buttonLoading">
            Publish Article
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: "newArticlePage",
  data: () => ({
    valid: false,
    title: "",
    body: "",
    description: "",
    tagList: [],
    items: [],
    fieldRequiredRule: [(v) => !!v || "Field is required", (v) => v.length >= 3 || "Field must be less than 3 characters"],
    buttonLoading: false,
  }),
  computed: {
    userToken() {
      return this.$store.getters.token;
    },
  },
  methods: {
    async addArticle() {
      try {
        this.buttonLoading = true;
        await fetch("https://api.realworld.io/api/articles", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: "Token " + this.userToken,
          },
          body: JSON.stringify({
            article: {
              title: this.title,
              body: this.body,
              description: this.description,
              tagList: this.title,
            },
          }),
        });
        await this.$router.push("./");
      } catch (e) {
        alert(e);
      } finally {
        this.buttonLoading = false;
      }
    },
  },
};
</script>

<style scoped></style>

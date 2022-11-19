<template>
  <v-form v-model="valid" @submit.prevent="updateUserData">
    <v-overlay :opacity="1" :value="overlay">
      <v-progress-circular indeterminate size="64"> Loading... </v-progress-circular>
    </v-overlay>
    <v-container>
      <v-row justify="center" align="center" class="mt-3">
        <v-col cols="12" class="text-center text-h4"> Your Settings</v-col>
        <v-col cols="12" md="7">
          <v-text-field v-model="image" label="Username" name="username" :rules="userNameRules"></v-text-field>
        </v-col>
        <v-col cols="12" md="7">
          <v-text-field v-model="username" label="Username" name="username" :rules="userNameRules"></v-text-field>
        </v-col>
        <v-col cols="12" md="7">
          <v-text-field v-model="bio" label="Bio" name="bio"></v-text-field>
        </v-col>
        <v-col cols="12" md="7">
          <v-text-field v-model="email" label="Email" name="email" :rules="emailRules"></v-text-field>
        </v-col>
        <v-col cols="12" md="7">
          <v-text-field v-model="newPassword" label="Password" name="username" :rules="passwordRules"></v-text-field>
        </v-col>
        <v-col cols="12" md="7" class="text-right">
          <v-btn color="green" class="text-capitalize white--text" :disabled="!valid" depressed x-large type="submit" :loading="buttonLoading">
            Update Setting
          </v-btn>
        </v-col>
        <v-col cols="12" md="7" class="text-right">
          <v-divider />
        </v-col>
        <v-col cols="12" md="7">
          <v-btn color="red" outlined plain class="text-capitalize white--text" @click="logoutUser" x-large> or click here to logout </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: "settingPage",
  data: () => ({
    overlay: true,
    valid: false,
    image: "",
    username: "",
    bio: "",
    email: "",
    newPassword: "",
    userNameRules: [(v) => !!v || "Username is required", (v) => v.length >= 3 || "Name must be less than 3 characters"],
    passwordRules: [(v) => !!v || "Password is required", (v) => v.length >= 3 || "Password must be less than 3 characters"],
    emailRules: [(v) => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || "E-mail must be valid"],
    buttonLoading: false,
  }),
  computed: {
    userToken() {
      return this.$store.getters.token;
    },
  },
  mounted() {
    this.fetchUserData();
  },
  methods: {
    async fetchUserData() {
      try {
        this.overlay = true;
        const response = await fetch("https://conduit.productionready.io/api/user", {
          method: "GET",
          headers: {
            authorization: "Token " + this.userToken,
            "content-type": "application/json",
          },
        });
        console.log("response***:", response);
        const responseData = await response.json();
        this.image = responseData.user.image;
        this.username = responseData.user.username;
        this.bio = responseData.user.bio !== null ? responseData.user.bio : "";
        this.email = responseData.user.email;
        console.log("this.image:", this.image);
      } catch (e) {
        console.log("error:", e);
      } finally {
        this.overlay = false;
      }
    },
    async updateUserData() {
      try {
        this.buttonLoading = true;
        const user = {
          image: this.image,
          username: this.username,
          bio: this.bio,
          email: this.email,
          password: this.password,
        };
        await this.$store.dispatch("updateUser", user);
        await this.fetchUserData();
        this.password = "";
      } catch (e) {
        alert(e);
      } finally {
        this.buttonLoading = false;
      }
    },
    async logoutUser() {
      try {
        await this.$store.dispatch("logout");
        await this.$router.push("/");
      } catch (e) {
        console.log("error:", e);
      }
    },
  },
};
</script>

<style scoped></style>

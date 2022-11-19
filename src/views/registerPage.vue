<template>
  <v-form v-model="valid" @submit.prevent="registerUser">
    <v-container>
      <v-row justify="center" align="center" class="mt-3">
        <v-col cols="12" class="text-center text-h4"> Sign Up </v-col>
        <v-col cols="12" class="text-center"> <v-btn outlined class="text-capitalize" color="indigo" to="/login"> Have an account? </v-btn> </v-col>
        <v-col cols="12" md="7">
          <v-text-field v-model="username" label="Username" name="username" :rules="userNameRules" :disabled="buttonLoading"></v-text-field
        ></v-col>
        <v-col cols="12" md="7"> <v-text-field v-model="email" label="Email" name="email" :rules="emailRules" :disabled="buttonLoading"></v-text-field></v-col>
        <v-col cols="12" md="7">
          <v-text-field v-model="password" label="Password" name="username" :rules="passwordRules" :disabled="buttonLoading"></v-text-field
        ></v-col>
        <v-col cols="12" md="7" class="text-right">
          <v-btn color="green" class="text-capitalize white--text" :disabled="!valid" depressed x-large type="submit" :loading="buttonLoading"> Sign Up </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: "registerPage",
  data: () => ({
    valid: false,
    username: "",
    password: "",
    email: "",
    userNameRules: [(v) => !!v || "Username is required", (v) => v.length >= 3 || "Name must be less than 3 characters"],
    passwordRules: [(v) => !!v || "Password is required", (v) => v.length >= 3 || "Password must be less than 3 characters"],
    emailRules: [(v) => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || "E-mail must be valid"],
    buttonLoading: false,
  }),
  methods: {
    async registerUser() {
      try {
        this.buttonLoading = true;
        const user = {
          username: this.username,
          email: this.email,
          password: this.password,
        };
        await this.$store.dispatch("signup", user);
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

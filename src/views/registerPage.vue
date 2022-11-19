<template>
  <v-form v-model="valid">
    <v-container>
      <v-row justify="center" align="center" class="mt-3">
        <v-col cols="12" class="text-center text-h4"> Sign Up </v-col>
        <v-col cols="12" class="text-center"> <v-btn outlined class="text-capitalize" color="indigo" to="/login"> Have an account? </v-btn> </v-col>
        <v-col cols="12" md="7"> <v-text-field v-model="userName" label="Username" name="userName" :rules="userNameRules"></v-text-field></v-col>
        <v-col cols="12" md="7"> <v-text-field v-model="password" label="Password" name="userName" :rules="passwordRules"></v-text-field></v-col>
        <v-col cols="12" md="7"> <v-text-field v-model="email" label="Email" name="email" :rules="emailRules"></v-text-field></v-col>
        <v-col cols="12" md="7" class="text-right">
          <v-btn color="green" class="text-capitalize white--text" :disabled="!valid" depressed x-large> Sign Up </v-btn>
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
    userName: "",
    password: "",
    email: "",
    userNameRules: [(v) => !!v || "Username is required", (v) => v.length >= 3 || "Name must be less than 3 characters"],
    passwordRules: [(v) => !!v || "Password is required", (v) => v.length >= 3 || "Password must be less than 3 characters"],
    emailRules: [(v) => !!v || "E-mail is required", (v) => /.+@.+/.test(v) || "E-mail must be valid"],
  }),
};
</script>

<style scoped></style>

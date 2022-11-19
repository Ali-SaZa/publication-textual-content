<template>
  <v-app>
    <v-main>
      <NavbarComponent />
      <router-view> </router-view>
    </v-main>
  </v-app>
</template>

<script>
import NavbarComponent from "@/components/NavbarComponent";

export default {
  name: "App",

  components: {
    NavbarComponent,
  },

  data: () => ({}),
  created() {
    this.$store.dispatch("tryLogin");
  },
};
</script>

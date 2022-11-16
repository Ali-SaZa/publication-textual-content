<template>
  <v-app>
    <v-main>
      <NavbarComponent />
      <HelloWorld />
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import NavbarComponent from "@/components/NavbarComponent";

export default {
  name: "App",

  components: {
    HelloWorld,
    NavbarComponent,
  },

  data: () => ({}),
};
</script>

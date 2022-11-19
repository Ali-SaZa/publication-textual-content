<template>
  <div>
    <v-toolbar color="teal">
      <v-toolbar-title>{{ navbarTitle }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn elevation="0" v-for="menuItem in menuItems" :key="menuItem.title" color="teal" class="text-capitalize cursor-pointer" :to="menuItem.path">
          {{ menuItem.title }}
        </v-btn>
      </v-toolbar-items>
      <v-app-bar-nav-icon @click="drawer = true" class="d-xs-flex d-md-none"></v-app-bar-nav-icon>
    </v-toolbar>
    <v-navigation-drawer v-model="drawer" absolute temporary right>
      <v-list nav dense>
        <v-list-item-group>
          <v-list-item v-for="(menuItem, index) in menuItems" :key="index" :to="menuItem.path">
            <v-list-item-title>
              {{ menuItem.title }}
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data: () => ({
    navbarTitle: "Publication Textual Content",
    drawer: false,
    tab: null,
    menuItems: [
      { title: "Home", path: "/" },
      { title: "Sign In", path: "/login" },
      { title: "Sign Up", path: "/register" },
    ],
  }),
};
</script>

<style lang="scss">
.cursor-pointer {
  cursor: pointer;
}
</style>

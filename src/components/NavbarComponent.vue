<template>
  <div>
    <v-toolbar color="teal">
      <v-toolbar-title>{{ navbarTitle }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn elevation="0" v-for="menuItem in activeMenuItems" :key="menuItem.title" color="teal" class="text-capitalize cursor-pointer" :to="menuItem.path">
          {{ menuItem.title }}
        </v-btn>
      </v-toolbar-items>
      <template v-if="isLoggedIn">
        <v-avatar size="26">
          <img :src="avatarImage" :alt="username" />
        </v-avatar>
        <span class="ml-2">
          {{ username }}
        </span>
      </template>
      <v-app-bar-nav-icon @click="drawer = true" class="d-xs-flex d-md-none"></v-app-bar-nav-icon>
    </v-toolbar>
    <v-navigation-drawer v-model="drawer" absolute temporary right>
      <v-list nav dense>
        <v-list-item-group>
          <v-list-item v-for="(menuItem, index) in activeMenuItems" :key="index" :to="menuItem.path">
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
    usersMenuItems: [
      { title: "Home", path: "/" },
      { title: "New Article", path: "/editor" },
      { title: "Settings", path: "/settings" },
    ],
    guestMenuItems: [
      { title: "Home", path: "/" },
      { title: "Sign In", path: "/login" },
      { title: "Sign Up", path: "/register" },
    ],
  }),
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    avatarImage() {
      return this.$store.getters.image;
    },
    username() {
      return this.$store.getters.username;
    },
    activeMenuItems() {
      if (this.isLoggedIn) {
        return this.usersMenuItems;
      } else {
        return this.guestMenuItems;
      }
    },
  },
};
</script>

<style lang="scss">
.cursor-pointer {
  cursor: pointer;
}
</style>

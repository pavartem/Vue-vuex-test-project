<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item
          color="indigo"
          link
          v-for="link of links"
          :key="link.title"
          :to="link.url"
        >
          <v-list-item-action>
            <v-icon color="indigo">{{link.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-title>{{link.title}}</v-list-item-title>
        </v-list-item>
        <v-list-item
          color="indigo"
          link
          v-if="isUserLoggedIn"
        >
          <v-list-item-action>
            <v-icon color="indigo">mdi-exit-to-app</v-icon>
          </v-list-item-action>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="hidden-md-and-up"
      />
      <v-toolbar-title>
        <router-link to="/" tag="span" class="pointer">Ad application</router-link>
      </v-toolbar-title>
      <v-spacer/>
      <div class="hidden-sm-and-down">
        <v-btn
          style="margin-left: 20px"
          link
          color="indigo darken-4"
          v-for="link in links"
          :key="link.title"
          :to="link.url"
        >
          <v-icon left>{{link.icon}}</v-icon>
          {{link.title}}
        </v-btn>
        <v-btn
          v-if="isUserLoggedIn"
          style="margin-left: 20px"
          link
          @click="onLogout"
          color="indigo darken-4"
        >
          <v-icon left>mdi-exit-to-app</v-icon>
          Logout
        </v-btn>
      </div>

    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
    <template v-if="error">
      <v-snackbar
        :multi-line="true"
        :timeout="5000"
        color="error"
        @input="closeError"
        :value="true"
      >
        {{error}}
        <v-btn text dark @click.native="closeError">Close</v-btn>
      </v-snackbar>
    </template>
    <v-footer
      color="indigo"
      app
      dark
    >
      <span>&copy; 2020 Artem Pavliuk</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({ drawer: false }),
  computed: {
    error() {
      return this.$store.getters.error;
    },
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn;
    },
    links() {
      if (this.isUserLoggedIn) {
        return [{
          title: 'Orders',
          icon: 'mdi-bookmark-outline',
          url: '/orders',
        },
        {
          title: 'New ad',
          icon: 'mdi-plus-circle',
          url: '/new',
        },
        {
          title: 'My ads',
          icon: 'mdi-playlist-check',
          url: '/list',
        }];
      }
      return [{
        title: 'Login',
        icon: 'mdi-account',
        url: '/login',
      },
      {
        title: 'Registration',
        icon: 'mdi-account-plus',
        url: '/registration',
      }];
    },
  },
  methods: {
    closeError() {
      this.$store.dispatch('clearError');
    },
    onLogout() {
      this.$store.dispatch('logoutUser');
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
  .pointer {
    cursor: pointer;
  }
</style>

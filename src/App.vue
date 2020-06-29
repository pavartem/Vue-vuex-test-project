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
      <v-toolbar-title>Application</v-toolbar-title>
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
      </div>

    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
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
  data: () => ({
    drawer: false,
    links: [
      {
        title: 'Login',
        icon: 'mdi-account',
        url: '/login',
      },
      {
        title: 'Registration',
        icon: 'mdi-account-plus',
        url: '/registration',
      },
      {
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
      },
    ],
  }),
};
</script>

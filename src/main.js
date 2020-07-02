import Vue from 'vue';
import * as fb from 'firebase';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
  created() {
    fb.initializeApp({
      apiKey: 'AIzaSyBWVCOsH_2qnmWZC_hdoazFF3IjBXiP4mY',
      authDomain: 'minin-course.firebaseapp.com',
      databaseURL: 'https://minin-course.firebaseio.com',
      projectId: 'minin-course',
      storageBucket: 'minin-course.appspot.com',
      messagingSenderId: '862499393292',
      appId: '1:862499393292:web:beaf66c995e1d4d7348329',
    });
    fb.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user);
      }
    });

    this.$store.dispatch('fetchAds');
  },
}).$mount('#app');

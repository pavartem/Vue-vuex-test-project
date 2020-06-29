<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="text--secondary mb-3">Create new ad</h1>
        <v-form v-model="valid" ref="form" validation>
          <v-text-field
            label="Add title"
            name="title"
            required
            :rules="[ v => !!v || 'Title is required']"
            type="text"
            v-model="title"
          ></v-text-field>

          <v-textarea
            label="Ad description"
            name="description"
            :rules="[ v => !!v || 'Title is required']"
            type="text"
            v-model="description"
          ></v-textarea>
        </v-form>
        <v-layout row>
          <v-flex xs12>
            <v-btn
              color="indigo"
              class="ma-2 white--text"
            >
              Upload
              <v-icon right dark>mdi-cloud-upload</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <img src="" height="100" alt="">
            <v-switch
              v-model="promo"
              color="indigo"
              label="Add to promo"
            ></v-switch>
            <v-spacer></v-spacer>
            <v-btn
              class="primary"
              @click="createAd"
              :disabled="!valid"
            >Create ad</v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'New ad',
  data: () => ({
    title: '',
    description: '',
    promo: false,
    valid: false,
  }),
  methods: {
    createAd() {
      if (this.$refs.form.validate()) {
        const ad = {
          title: this.title,
          description: this.description,
          promo: this.promo,
        };
        console.log(ad);
      }
    },
  },
};
</script>

<style scoped>

</style>

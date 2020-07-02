<template>
  <v-container
    class="fill-height"
    fluid
  >
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        sm="8"
        md="4"
      >
        <v-card class="elevation-12">
          <v-toolbar
            color="indigo"
            dark
            flat
          >
            <v-toolbar-title>Registration form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form v-model="valid" ref="form" lazy-validation>
              <v-text-field
                label="Email"
                name="email"
                :rules="emailRules"
                prepend-icon="mdi-account"
                type="email"
                v-model="email"
              ></v-text-field>

              <v-text-field
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                :rules="passwordRules"
                type="password"
                v-model="password"
              ></v-text-field>
              <v-text-field
                label="Confirm password"
                name="confirm-password"
                prepend-icon="mdi-lock"
                :rules="confirmPasswordRules"
                type="password"
                v-model="confirmPassword"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="indigo"
              large
              class="login-btn"
              :loading="loading"
              @click="onSubmit"
              :disabled="!valid || loading"
            >
              Create Account
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Registration',
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      valid: false,
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [
        (v) => !!v || 'Password is required',
        (v) => v.length > 6 || 'Name must be less than 6 characters',
      ],
      confirmPasswordRules: [
        (v) => !!v || 'Confirm password is required',
        (v) => v === this.password || 'Passwords should match',
      ],
    };
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
  },
  methods: {
    onSubmit() {
      if (this.$refs.form.validate()) {
        const user = {
          email: this.email,
          password: this.password,
        };
        this.$store.dispatch('registerUser', user)
          .then(() => {
            this.$router.push('/');
          })
          .catch(() => {});
      }
    },
  },
};
</script>

<style scoped>
  .login-btn {
    color: white;
  }
</style>

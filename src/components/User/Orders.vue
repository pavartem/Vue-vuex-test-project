<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="text--secondary mb-3">Orders</h1>
        <v-list
          v-for="order in orders"
          :key="order.id"
        >

          <v-list-item-group>
            <v-list-item>
              <template>
                <v-list-item-action>
                  <v-checkbox
                    :input-value="order.done"
                    color="indigo"
                    @change="markDone(order)"
                  ></v-checkbox>
                </v-list-item-action>

                <v-list-item-content>
                  <v-list-item-title>{{order.name}}</v-list-item-title>
                  <v-list-item-subtitle>{{order.phone}}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn
                    class="indigo"
                    style="color: white"
                    :to="'/ad/' + order.id"
                  >Open</v-btn>
                </v-list-item-action>
              </template>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    orders: [
      {
        id: 'dgfg3',
        name: 'pavartem',
        phone: '380673515614',
        adId: '123',
        done: false,
      },
    ],
  }),
  methods: {
    markDone(order) {
      // eslint-disable-next-line no-param-reassign
      order.done = true;
    },
  },
};
</script>

<style scoped>

</style>

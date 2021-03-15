<template>
  <v-list>
    <v-col v-for="people in peoples" :key="people.id" cols="12" md="4" style="display: inline-block">
      <v-list-item>
        <v-list-item-avatar color="indigo">
          <span class="white--text headline">{{ people.nickname[0] }}</span>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ people.nickname }}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-icon @click="remove(people.id)">mdi-minus-circle-outline</v-icon>
        </v-list-item-action>
      </v-list-item>
    </v-col>
  </v-list>
  <!-- <div>
    <v-container>
      <v-card v-for="people in peoples" :key="people.id">
        <v-card-text>
          {{ people.nickname }}
        </v-card-text>
        <v-card-actions>
          <v-btn text color="orange" @click="remove(people.id)">
            <v-icon>mdi-minus-circle-outline</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </div> -->
</template>
<script>
export default {
  props: {
    peoples: {
      type: Array,
      required: true,
    },
    remove: {
      type: Function,
      required: true,
    },
  },
}
</script>
<style>
  
</style>
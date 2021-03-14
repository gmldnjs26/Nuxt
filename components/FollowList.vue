<template>
  <div>
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
  </div>
</template>
<script>
export default {
  props: {
    peoples: {
      type: Array,
      required: true,
      // default: () => {
      //   return {
      //     id: 999,
      //     nickname: '팔로워없음',
      //   }
      // }
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
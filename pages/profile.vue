<template>
  <div>
    <v-container>
      <v-card style="margin: 10px 0;">
        <v-container>
          <v-container>
            <v-subheader>My Profile</v-subheader>
          </v-container>
          <v-form>
            <v-text-field
              label="닉네임"
              required
            />
            <v-btn color="blue" type="submit">수정</v-btn>
          </v-form>
        </v-container>
      </v-card>
      <v-card style="margin: 10px 0;">
        <v-container>
          <v-subheader>팔로잉</v-subheader>
          <follow-list />
        </v-container>
      </v-card>
      <v-card style="margin: 10px 0;">
        <v-container>
          <v-subheader>팔로워</v-subheader>
          <follow-list />
        </v-container>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import FollowList from '~/components/FollowList';
export default {
  components: {
    FollowList,
  },
  // layout: 'admin', // Nuxt가 추가한 기능
  data() {
    return {
      name: 'Nuxt.js'
    }
  },
  head() {
    return {
      title: '프로필'
    }
  },
}
</script>

<style>

</style>
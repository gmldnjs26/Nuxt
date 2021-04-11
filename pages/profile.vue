<template>
  <div>
    <v-container>
      <v-card style="margin: 10px 0;">
        <v-container>
          <v-container>
            <v-subheader>My Profile</v-subheader>
          </v-container>
          <v-form ref="form" v-model="valid" @submit.prevent="onChangeNickname">
            <v-text-field
              v-model="nickname"
              label="닉네임"
              :rules="nicknameRules"
              required
            />
            <v-btn color="blue" type="submit">수정</v-btn>
          </v-form>
        </v-container>
      </v-card>
      <v-card style="margin: 10px 0;">
        <v-container>
          <v-subheader>팔로잉</v-subheader>
          <follow-list :peoples="following" :remove="cancleFollowing" />
          <v-btn @click="loadMoreFollowings" v-if="hasMoreFollowing" dark color="green" style="width: 100%">더보기</v-btn>
        </v-container>
      </v-card>
      <v-card style="margin: 10px 0;">
        <v-container>
          <v-subheader>팔로워</v-subheader>
          <follow-list :peoples="follower" :remove="removeFollower" />
          <v-btn @click="loadMoreFollowers" v-if="hasMoreFollower" dark color="green" style="width: 100%">더보기</v-btn>
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
  data() {
    return {
      valid: false,
      nickname: '',
      nicknameRules:[
        v => !!v || "닉네임을 입력해주세요.",
      ] 
    }
  },
  fetch({ store }) {
    store.dispatch('users/loadFollowers', { offset: 0 });
    return store.dispatch('users/loadFollowings', { offset: 0 });
  },
  computed: {
    follower() {
      return this.$store.state.users.followerList;
    },
    following() {
      return this.$store.state.users.followingList;
    },
    hasMoreFollowing() {
      return this.$store.state.users.hasMoreFollowing;
    },
    hasMoreFollower() {
      return this.$store.state.users.hasMoreFollower;
    }
  },
  methods: {
    onChangeNickname() {
      this.$store.dispatch('users/changeNickname', {
        nickname: this.nickname,
      });
    },
    removeFollower(userId) {
      this.$store.dispatch('users/removeFollower', {
        userId,
      })
    },
    cancleFollowing(userId) {
      console.log("userId" + userId);
      this.$store.dispatch('users/unFollow', {
        userId,
      })
    },
    loadMoreFollowers() {
      this.$store.dispatch('users/loadFollowers')
    },
    loadMoreFollowings() {
      this.$store.dispatch('users/loadFollowings')
    }
  },
  middleware: 'authenticated', // middleware name
}
</script>

<style>

</style>
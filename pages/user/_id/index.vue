<template>
  <v-container>
    <v-card style="margin-bottom: 20px">
      <v-container>
        {{other.nickname}}
      </v-container>
      <v-row>
        <v-col cols="4">팔로잉: {{ other.Followings.length }}</v-col>
        <v-col cols="4">팔로워: {{ other.Followers.length }}</v-col>
        <v-col cols="4">게시글 수: {{ other.Posts.length }}</v-col>
      </v-row>
    </v-card>
    <div>
      <post-card v-for="p in mainPosts" :key="p.id" :post="p"/>
    </div>
    <!-- <error-modal v-if="errFlg" @close="errFlg=false">
      <h3 slot="header">
        Error!
      </h3>
      <div slot="body">
        <h3>
          게시물이 존재하지않습니다.
        </h3>
        <v-btn style="color: green; float:right; margin: 0px 3px;" @click="errFlg = false">확인</v-btn>
      </div>
    </error-modal> -->
  </v-container>
</template>

<script>
import PostCard from '~/components/PostCard';

export default {
  components: {
    PostCard,
  },
  data() {
    return {
      errFlg: false,
    }
  },
  fetch({ store, params }) {
    store.dispatch('users/loadOther', {
      userId: params.id,
    });
    return store.dispatch('posts/loadOtherPosts', {
      userId: params.id,
    });
  },
  computed: {
    other() {
      return this.$store.state.users.other;
    },
    mainPosts() {
      return this.$store.state.posts.mainPosts;
    },
  },
}
</script>

<style>
.closeModalBtn {
  color: #42b983;
}
</style>
<template>
  <v-container>
    <post-form v-if="me" />
    <div>
      <post-card v-for="p in mainPosts" :key="p.id" :post="p"/>
    </div>
    <error-modal v-if="errFlg" @close="errFlg=false">
      <h3 slot="header">
        Error!
      </h3>
      <div slot="body">
        <h3>
          게시물이 존재하지않습니다.
        </h3>
        <v-btn style="color: green; float:right; margin: 0px 3px;" @click="errFlg = false">확인</v-btn>
      </div>
    </error-modal>
  </v-container>
</template>

<script>
import PostCard from '~/components/PostCard';
import PostForm from '~/components/PostForm';
import ErrorModal from '~/components/common/ErrorModal.vue';

export default {
  components: {
    PostCard,
    PostForm,
    ErrorModal,
  },
  data() {
    return {
      errFlg: false,
    }
  },
  fetch({ store }) {
    return store.dispatch('posts/loadPosts', {'offset': 0})
  },
  // asyncData() {
  //   return {};
  // },
  mounted() {
    window,addEventListener('scroll', this.onScroll);
  },
  beforeDestroy() { // created에서 만든건 여기서 제거안해주면 메모리 누수가 생긴다.
    window.removeEventListener('scroll', this.onScroll);
  },
  computed: {
    me() {
      return this.$store.state.users.me;
    },
    mainPosts() {
      return this.$store.state.posts.mainPosts;
    },
    hasMorePost() {
      return this.$store.state.posts.hasMorePost;
    },
    errMsg() {
      console.log("errMsg");
      if (this.$store.state.posts.errMsg) {
        console.log("errMsg2")
        this.errFlg = true;
        return this.$store.state.posts.errMsg;
      }
    }
  },
  methods: {
    onScroll() {
      if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300 ) {
        if (this.hasMorePost) {
          this.$store.dispatch('posts/loadPosts');
        }
      }
    }
  }
}
</script>

<style>
.closeModalBtn {
  color: #42b983;
}
</style>
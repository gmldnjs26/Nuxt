<template>
  <v-container>
    <post-form v-if="me" />
    <div>
      <post-card v-for="p in mainPosts" :key="p.id" :post="p"/>
    </div>
  </v-container>
</template>

<script>
import PostCard from '~/components/PostCard';
import PostForm from '~/components/PostForm';

export default {
  components: {
    PostCard,
    PostForm,
  },
  async fetch({ store }) {
    await store.dispatch('posts/loadPosts')
  },
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
    }
  },
  methods: {
    onScroll() {
      if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300 ) {
        if (this.hasMorePost) {
          this.$store.dispatch('posts/loadPost');
        }
      }
    }
  }
}
</script>

<style>

</style>
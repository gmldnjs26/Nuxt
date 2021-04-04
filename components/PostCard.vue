<template>
  <div style="margin: 10px 0px;">
    <v-card>
      <post-images :images="post.Images || []"></post-images>
      <v-card-title>
        <h3><nuxt-link :to="`/user/ + ${post.id}`">{{ post.User.nickname }}</nuxt-link></h3>
      </v-card-title>
      <v-card-text>
        <div>
          <h3>{{ post.User.nickname }}</h3>
          <div>{{ post.content }}</div>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="orange" @click="onRetweet">
          <v-icon>mdi-twitter-retweet</v-icon>
        </v-btn>
        <v-btn text color="orange" @click="onClickHeart">
          <v-icon>{{ heartIcon }}</v-icon>
        </v-btn>
        <v-btn text color="orange" @click="onToggleComment">
          <v-icon>mdi-comment-outline</v-icon>
        </v-btn>
        <v-menu offset-y open-on-hover>
          <template v-slot:activator="{ on }">
            <v-btn text color="orange" v-on="on">
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
          </template>
          <div style="background: white">
            <v-btn dark color="red" @click="onRemovePost">삭제</v-btn>
            <v-btn dark color="orange" @click="onEditPost">편집</v-btn>
          </div>
        </v-menu>
      </v-card-actions>
    </v-card>
    <template v-if="commentOpened">
      <comment-form :post-id="post.id" />
      <v-list>
        <v-list-item v-for="c in post.Comments" :key="c.id">
          <v-list-item-avatar color="teal">
            <span>{{ c.User.nickname[0] }}</span>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ c.User.nickname }}</v-list-item-title>
            <v-list-item-subtitle>{{ c.content }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>
  </div>
</template>
<script>
import commentForm from '~/components/CommentForm.vue';
import PostImages from '~/components/PostImages.vue';
export default {
  components: {
    commentForm,
    PostImages,
  },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      commentOpened: false,
    }
  },
  computed: {
    liked() {
      const me = this.$store.state.users.me;
      return (this.post.Likers || []).find(v => v.id === (me && me.id));
    },
    heartIcon() {
      const me = this.$store.state.users.me;
      const liked = (this.post.Likers || []).find(v => v.id === (me && me.id));
      return liked ? 'mdi-heart' : 'mdi-heart-outline';
    },
    me() {
      return this.$store.state.users.me;
    }
  },
  methods: {
    onRemovePost() {
      this.$store.dispatch('posts/remove', {
        postId: this.post.id
      })
    },
    onEditPost() {

    },
    onToggleComment() {
      if (!this.commentOpened) {
        this.$store.dispatch('posts/loadComments', {
          postId: this.post.id,
        });
      }
      this.commentOpened = !this.commentOpened
    },
    onRetweet() {
      if (!this.me) {
        return alert('로그인이 필요합니다.');
      }
      this.$store.dispatch('posts/retweet', {
        postId: this.post.id,
      });
    },
    onClickHeart() {
      if (!this.me) {
        return alert('로그인이 필요합니다.');
      }
      if(this.liked) {
        return this.$store.dispatch('posts/unlikePost', {
          postId: this.post.id,
        });
      }
      return this.$store.dispatch('posts/likePost', {
        postId: this.post.id,
      })
    }
  }
}
</script>
<style scoped>
  a {
    color: inherit;
    text-decoration: none;
  }    
</style>
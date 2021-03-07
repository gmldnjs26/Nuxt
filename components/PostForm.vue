<template>
  <v-card style = "margin: 10px 0;">
    <v-container>
      <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
        <v-textarea 
          v-model="content"
          outlined
          auto-grow
          clearable
          label="어떤 신기한 일이 있엇나요?"
          :hide-details="hideDetails"
          :success-message="successMessages"
          :success="success"
          :rules="[v => !!v.trim() || '내용을 입력하세요.']"
          @input="onChangeTextarea"
        />
        <v-btn type="submit" color="green" fixed right style="margin-right : 10px">짹짹</v-btn>
        <v-btn>이미지 업로드</v-btn>
      </v-form>
    </v-container>
  </v-card>
</template>
<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      hideDetails: true,
      successMessages: '',
      success: false,
      content: '',
      valid: false,
    }
  },
  computed: {
    // me() {
    //   return this.$store.state.users.me;
    // }
    ...mapState('users', ['me']),
  },
  methods: {
    onChangeTextarea() {
      this.hideDetails = true;
      this.success = false;
      this.successMessages = '';
    },
    onSubmitForm() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('posts/add', {
          content: this.content,
          User: {
            nickname: this.me.nickname,
          },
          Comments: [],
          Images: [],
          id: Date.now(),
          createdAt: Date.now(),
        })
        .then(() => {
          this.content = '';
          this.hideDetails = false;
          this.success = true;
          this.successMessages = "게시글 등록 성공!";
        })
        .catch(() => {
          console.log("게시글 등록 실패!");
        });
      }
    }
  }
}
</script>
<style >
  
</style>
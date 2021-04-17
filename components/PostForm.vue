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
        <input ref="imageInput" type="file" multiple hidden @change="onChangeImages">
        <v-btn type="button" @click="onClickImageUpload">이미지 업로드</v-btn>
        <v-btn type="submit" color="green" absolute right style="margin-right : 10px">짹짹</v-btn>
        <div>
            <div v-for="(p,i) in imagePaths" :key="p" style="display: inline-block">
              <img :src="`http://localhost:3087/${p}`" alt="p" style="width: 200px">
              <div>
                <button @click="onRemoveImage(i)" type="button">제거</button>
              </div>
            </div>
        </div>
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
    ...mapState('users', ['me']),
    ...mapState('posts', ['imagePaths'])
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
    },
    onClickImageUpload() {
      this.$refs.imageInput.click();
    },
    onChangeImages(e) {
      let imageFormData = new FormData();
      [].forEach.call(e.target.files, (f) => {
        imageFormData.append('image', f);
      });
      this.$store.dispatch('posts/uploadImages', imageFormData);
    },
    onRemoveImage(index) {
      this.$store.commit('posts/removeImagePath', index);
    }
  }
}
</script>
<style >
  
</style>
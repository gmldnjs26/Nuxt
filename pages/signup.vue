<template>
  <v-container>
    <v-card>
      <v-container>
        <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
          <v-text-field 
            v-model="email"
            label="이메일"
            type="email"
            :rules="emailRules"
            required
          />
          <v-text-field 
            v-model="password"
            label="패스워드"
            type="password"
            :rules="passwordRules"
            required
          />
          <v-text-field 
            v-model="passwordCheck"
            label="패스워드 확인"
            type="password"
            :rules="passwordCheckRules"
            required
          />
          <v-text-field 
            v-model="nickname"
            label="닉네임"
            type="nickname"
            :rules="nicknameRules"
            required
          />
          <v-checkbox
            v-model="terms" 
            label="동의합니꽈?"
            :rules="[v => !!v || '약관에 동의해야 합니다.']"
            required
          />
          <v-btn color="green" type="submit">가입하기</v-btn>
        </v-form>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      valid:false,
      email:'',
      password:'',
      passwordCheck:'',
      nickname:'',
      terms:false,
      emailRules: [
        v => !!v || '이메일은 필수입니다.',
        v => /.+@.+/.test(v) || '이메일이 유효하지 않습니다.'
      ],
      nicknameRules: [
        v => !!v || '닉네임은 필수입니다.',
      ],
      passwordRules: [
        v => !!v || '패스워드는 필수입니다.',
      ],
      passwordCheckRules: [
        v => !!v || '패스워드확인은 필수입니다.',
        v => v === this.password || '비밀번호가 일치하지 않습니다.'
      ],
    }
  },
  methods: {
    onSubmitForm() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('users/signUp', { // dispatch 자체가 Promise
          nickname: this.nickname,
          email: this.email
        })
        .then(() => {
          this.$router.push({ // nuxt도 내부적으로 router를 쓰기때문에 가능
            path: '/',
          });
        })
        .catch(() => console.log('Failed'));
      } else {
        alert('폼이 유효하지 않습니다.')
      }
    }
  },
}
</script>

<style>

</style>
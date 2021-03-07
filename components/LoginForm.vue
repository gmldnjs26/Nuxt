<template>
  <v-container v-if="!me">
    <v-card>
      <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
        <v-container>
					<v-text-field 
						label="이메일" 
						type="email" 
            v-model="email"
            :rules="emailRules"
						required 
					/>
					<v-text-field 
						label="비밀번호" 
						type="password"
            v-model="password"
            :rules="passwordRules"
						required 
					/>
					<v-btn color="green" type="submit" :disabled="!valid">로그인</v-btn>
					<v-btn nuxt-to="/signup">회원가입</v-btn>
				</v-container>
      </v-form>
    </v-card>
  </v-container>
  <v-container v-else>
    <v-card>
      {{ me.nickname }}로그인되었습니다.
      <v-btn @click="onLogOut">로그아웃</v-btn>
    </v-card>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      email:'',
      password:'',
      valid: false,
      emailRules: [
        v => !!v || '이메일을 입력해주세요.',
        v => /.+@.+/.test(v) || '이메일이 유효하지 않습니다.'
      ],
      passwordRules: [
        v => !!v || 'Password를 입력해주세요.'
      ]
    }
  },
  computed: {
    me() {
      return this.$store.state.users.me;
    }
  },
  methods: {
    onSubmitForm() {
      if(this.$refs.form.validate()) {
        this.$store.dispatch('users/logIn', {
          email: this.email,
          nickname: 'heewon',
        })
      }
    },
    onLogOut() {
      this.$store.dispatch('users/logOut');
    }
  },
}
</script>
<style>
  
</style>
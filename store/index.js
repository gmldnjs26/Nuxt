export const state = () => ({
  name:'posts',
  errFlg: false,
});

export const mutations = {
  bye(state) {
    state.name = 'goodbye posts';
  }
};

export const actions = {
  nuxtServerInit({commit, dispatch, state}, { req }) { // 화면 그려지기 전에 실행
    console.log("nuxtServerInit1");
    return dispatch('users/loadUser'); // return 을 해서 Promise종료를 알려야된다.
  }
}
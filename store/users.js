export const state = () => ({
  me: null, // me가 null이면 비로그인 있으면 로그인한 상태
  followerList :[],
  followingList: [],
});

export const mutations = {
  setMe(state, payload) {
    state.me = payload;
  },
  changeNickname(state, payload) {
    state.me.nickname = payload.nickname;
  }
};

export const actions = { // context -> {commit, dispatch, state, rootState, getters, rootGetters}
  signUp(context, payload) {
    // 서버에 회원가입 요청을 보내는 부분
    context.commit('setMe', payload);
  },
  logIn(context, payload) {
    context.commit('setMe', payload);
  },
  logOut(context, payload) {
    context.commit('setMe', payload);
  },
  changeNickname({ commit }, payload) {
    commit('chageNickname', payload);
  },
};
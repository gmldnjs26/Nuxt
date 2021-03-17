export const state = () => ({
  me: null, // me가 null이면 비로그인 있으면 로그인한 상태
  hasMoreFollower: true,
  hasMoreFollowing: true,
  followerList :[
    {
      id:1,
      nickname:'팔로워1'
    },
    {
      id:2,
      nickname:"팔로워2"
    },
    {
      id:3,
      nickname:"팔로워3"
    },
  ],
  followingList: [
    {
      id:1,
      nickname:'팔로잉1'
    },
    {
      id:2,
      nickname:"팔로잉2"
    },
    {
      id:3,
      nickname:"팔로잉3"
    },
  ]
});

export const mutations = {
  setMe(state, payload) {
    state.me = payload;
  },
  changeNickname(state, payload) {
    state.me.nickname = payload.nickname;
  },
  removeFollower(state, payload) {
    const index = state.followerList.findIndex( v => v.id === payload.id);
    state.followerList.splice(index, 1); // 팔로워 삭제
  },
  cancleFollowing(state, payload) {
    const index = state.followingList.findIndex( v => v.id === payload.id);
    state.followingList.splice(index, 1); // 팔로잉 취소
  },

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
    commit('changeNickname', payload);
  },
  removeFollower({ commit }, payload) {
    commit('removeFollower', payload);
  },
  cancleFollowing({ commit }, payload) {
    commit('cancleFollowing', payload);
  },
  loadFollower({ commit, state }, payload) {
    if (state.hasMoreFollower) {
      commit('loadFollowers');
    }
  },
  loadFollowing({ commit, state }, payload) {
    if (state.hasMoreFollowing) {
      commit('loadFollowings');
    }
  }

};
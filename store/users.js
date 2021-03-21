export const state = () => ({
  me: null, // me가 null이면 비로그인 있으면 로그인한 상태
  hasMoreFollower: true,
  hasMoreFollowing: true,
  followerList :[],
  followingList: []
});

const totalFollowers = 8;
const totalFollowings = 6;
const limit = 3;

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
  loadFollowers(state) {
    const diff = totalFollowers - state.followerList.length;
    const fakeUsers = Array(diff < limit ? diff : limit).fill().map(v => ({
      id: Math.random().toString(),
      nickname: "Follower" + Math.random().toString(),
    }));
    state.followerList = state.followerList.concat(fakeUsers);
    state.hasMoreFollower = fakeUsers.length === limit;
  },
  loadFollowings(state) {
    const diff = totalFollowings - state.followingList.length;
    const fakeUsers = Array(diff < limit ? diff : limit).fill().map(v => ({
      id: Math.random().toString(),
      nickname: "Following" + Math.random().toString(),
    }));
    state.followingList = state.followingList.concat(fakeUsers);
    state.hasMoreFollowing = fakeUsers.length === limit;
  }
};

export const actions = { // context -> {commit, dispatch, state, rootState, getters, rootGetters}
  signUp(context, payload) {
    console.log(this);
    this.$axios.post('http://localhost:3086/user/', {
      nickname: payload.nickname,
      email: payload.email,
      password: payload.password,
    }, {
      withCredentials: true,
    }).then((res) => {
      context.commit('setMe', res.data);
    }).catch((err) => {
      console.log(err);
    });
  },
  logIn(context, payload) {
    this.$axios.post('http://localhost:3086/user/login', {
      email: payload.email,
      password: payload.password,
    }, {
      withCredentials: true,
    }).then((res) => {
      context.commit('setMe', res.data);
    }).catch((err) => {
      console.log(err);
    });
  },
  logOut(context) {
    this.$axios.post('http://localhost:3086/user/logout', {},{ withCredentials: true })
    .then(() => {
      context.commit('setMe', null);
    }).catch((err) => {
      console.log(err);
    });
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
  loadFollowers({ commit, state }) {
    if (state.hasMoreFollower) {
      commit('loadFollowers');
    }
  },
  loadFollowings({ commit, state }) {
    if (state.hasMoreFollowing) {
      commit('loadFollowings');
    }
  }
};
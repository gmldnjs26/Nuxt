export const state = () => ({
  me: null, // me가 null이면 비로그인 있으면 로그인한 상태
  hasMoreFollower: true,
  hasMoreFollowing: true,
  followerList: [],
  followingList: [],
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
    let index = state.followerList.findIndex( v => v.id === payload.userId);
    state.followerList.splice(index, 1); // 팔로워 삭제
    index = state.me.Followers.findIndex( v => v.id === payload.userId);
    state.me.followerList.splice(index, 1); // 팔로워 삭제
  },
  cancleFollowing(state, payload) {
    let index = state.followingList.findIndex( v => v.id === payload.userId);
    state.followingList.splice(index, 1); // 팔로잉 취소
    index = state.me.Followings.findIndex( v => v.id === payload.userId);
    state.me.Followings.splice(index, 1); // 팔로잉 취소
  },
  loadFollowers(state, payload) {
    console.log(payload)
    if (payload.offset === 0) {
      state.followerList = payload.data;
    } else {
      state.followerList = state.followerList.concat(payload.data);
    }
    state.hasMoreFollower = payload.data.length === limit;
  },
  loadFollowings(state, payload) {
    if (payload.offset === 0) {
      console.log("초기화");
      state.followingList = payload.data;
    } else {
      state.followingList = state.followingList.concat(payload.data);
    }
    state.hasMoreFollowing = payload.data.length === limit;
  },
  addfollowing(state, payload) {
    state.me.Followings.push({
      id: payload.userId,
    });
  },
};

export const actions = { // context -> {commit, dispatch, state, rootState, getters, rootGetters}
  loadUser({ commit }) {
    this.$axios.get('/user/',{
      withCredentials: true,
    })
    .then((res) => {
      commit('setMe', res.data);
    })
    .catch((err) => {
      console.log(err);
    })
  },
  signUp(context, payload) {
    this.$axios.post('/user/', {
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
    this.$axios.post('/user/login', {
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
    this.$axios.post('/user/logout', {},{ withCredentials: true })
    .then(() => {
      context.commit('setMe', null);
    }).catch((err) => {
      console.log(err);
    });
  },
  changeNickname({ commit }, payload) {
    console.log(payload.nickname);
    this.$axios.patch(`/user/nickname`, { nickname: payload.nickname }, {
      withCredentials: true,
    })
    .then((res) => {
      commit('changeNickname', res.data);
    })
    .catch((err) => {
      console.error(err);
    })
  },
  removeFollower({ commit }, payload) {
    return this.$axios.delete(`/user/${payload.userId}/follower`, {
      withCredentials: true,
    })
    .then((res) => {
      commit('removeFollower', {
        userId: payload.userId,
      })
    })
    .catch(err => {
      console.error(err);
    });
  },
  loadFollowers({ commit, state }, payload) {
    let offset = state.followerList.length;
    if (payload && payload.offset === 0) {
      offset = 0;
    }
    if (state.hasMoreFollower) {
      return this.$axios.get(`/user/${state.me.id}/followers?limit=3&offset=${offset}`,{
        withCredentials: true,
      })
      .then((res) => {
        commit('loadFollowers', {
          data: res.data,
          offset,
        })
      })
      .catch(err => {
        console.error(err);
      });
    }
  },
  loadFollowings({ commit, state }, payload) {
    let offset = state.followingList.length;
    if (payload && payload.offset === 0) {
      state.hasMoreFollowing = true;
      offset = 0;
    }
    if (state.hasMoreFollowing) {
      return this.$axios.get(`/user/${state.me.id}/followings?limit=3&offset=${offset}`, {
        withCredentials: true,
      })
      .then((res) => {
        commit('loadFollowings', {
          data: res.data,
          offset,
        })
      })
      .catch(err => {
        console.error(err);
      });
    }
  },
  follow({ commit }, payload) {
    this.$axios.post(`/user/${payload.userId}/follow`, {}, {
      withCredentials: true,
    })
    .then((res) => {
      commit('addfollowing', {
        userId: res.data,
      });
    })
    .catch((err) => {
      console.error(err);
    })
  },
  unFollow({ commit }, payload) {
    this.$axios.delete(`/user/${payload.userId}/following`, {
      withCredentials: true,
    })
    .then((res) => {
      console.log(res)
      commit('cancleFollowing', {
        userId: res.data,
      });
    })
    .catch((err) => {
      console.error(err);
    })
  },

  removeFollower({ commit }, payload) {
    this.$axios.delete(`/user/${payload.userId}/follower`, {
      withCredentials: true,
    })
    .then((res) => {
      commit('removeFollower', {
        userId: res.data,
      });
    })
    .catch((err) => {
      console.error(err);
    })
  },
  
};
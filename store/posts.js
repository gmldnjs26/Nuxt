export const state = () => ({
  mainPosts: [],
  hasMorePost: true,
  imagePaths: [],
});

const limit = 10; // 실무에서는 라맛방식으로는 안한다고 한다. 변동이 많기때문
const totalPosts = 51; 

export const mutations = {
  addMainPost(state, payload) {
    state.mainPosts.unshift(payload); // 제일 앞으로
  },
  removeMainPost(state, payload) {
    const index = state.mainPosts.findIndex( v => v.id === payload.id);
    state.mainPosts.splice(index, 1); // 삭제
  },
  addComment(state, payload) {
    const index = state.mainPosts.findIndex( v => v.id === payload.postId);
    state.mainPosts[index].Comments.unshift(payload);
  },
  loadComments(state, payload) {
    const index = state.mainPosts.findIndex(v => v.id === payload.postId);
    state.mainPosts[index].Comments = payload;
  },
  loadPosts(state, payload) {
    // const diff = totalPosts - state.mainPosts.length; // 아직 안불러온 게시글 수
    // const fakePosts = Array(diff > limit ? limit : diff).fill().map(v => ({
    //   id: Math.random().toString(),
    //   User: {
    //     id: 1,
    //     nickname:'ZeroCho',
    //   },
    //   content: `Hello infinite scrolling~ ${Math.random()}`,
    //   Commments: [],
    //   Images: [],
    // }));
    state.mainPosts = state.mainPosts.concat(payload);
    state.hasMorePost = fakePosts.length === limit;
  },
  concatImagePaths(state, payload) {
    state.imagePaths = state.imagePaths.concat(payload);
  },
  removeImagePath(state, payload) {
    state.imagePaths.splice(payload, 1);
  }
}

export const actions = {
  add({commit}, payload) {
    this.$axios.post('http://localhost:3086/post', {
      content: payload.content,
      imagePaths: state.imagePaths,
    }, {
      withCredentials: true,
    })
    .then((res) => {
      commit('addMainPost', res.data, { root: false}); // 3번째 root인자는 index.js를 참조할지안할지
    })
    .catch((e) => {
      console.log(e);
    })
  },
  remove({ commit }, payload) {
    commit('removeMainPost', payload);
  },
  addComment({ commit }, payload) {
    this.$axios.post(`http://localhost:3086/post/${payload.postId}/comment`, {
      content: payload.content,
    }, {
      withCredentials: true,
    })
    .then((res) => {
      commit('addComment', res.data);
    })
    .catch((err) => {
      console.log(err);
    })
  },
  loadComments({commit, state}, payload) {
    this.$axios.get(`http://localhost:3086/post/${payload.postId}/comments`)
      .then((res) => {
        commit('loadComments', res.data);
      })
      .catch((err) => {
        console.log(err);
      })
  },
  loadPosts({ commit,state}, payload) {
    if (state.hasMorePost) {
      this.$axios.get(`http://localhost:3086/posts?offset=${state.mainPosts.length}&limit=${limit}`)
        .then((res) => {
          commit('loadPosts', res.data);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  },
  uploadImages({ commit }, payload) {
    this.$axios.post('http://localhost:3086/post/images', payload, {
      withCredentials: true,
    })
    .then((res) => {
       commit('concatImagePaths', res.data);
    })
    .catch((e) => {
      console.log(e);
    })
  }
}
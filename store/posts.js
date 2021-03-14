export const state = () => ({
  mainPosts: [],
  hasMorePost: true,
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
  loadPosts(state) {
    const diff = totalPosts - state.mainPosts.length; // 아직 안불러온 게시글 수
    const fakePosts = Array(diff > limit ? limit : diff).fill().map(v => ({
      id: Math.random().toString(),
      User: {
        id: 1,
        nickname:'ZeroCho',
      },
      content: `Hello infinite scrolling~ ${Math.random()}`,
      Commments: [],
      Images: [],
    }));
    state.mainPosts = state.mainPosts.concat(fakePosts);
    state.hasMorePost = fakePosts.length === limit;
  }
}

export const actions = {
  add({commit}, payload) {
    commit('addMainPost', payload, { root: false}); // 3번째 root인자는 index.js를 참조할지안할지
  },
  remove({ commit }, payload) {
    commit('removeMainPost', payload);
  },
  addComment({ commit }, payload) {
    commit('addComment', payload);
  },
  loadPost({ commit,state}, payload) {
    if (state.hasMorePost) {
      commit('loadPosts');
    }
  }
}
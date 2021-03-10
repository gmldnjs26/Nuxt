export const state = () => ({
  mainPosts: [],
});

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
}

export const actions = {
  add({commit}, payload) {
    commit('addMainPost', payload, { root: false}); // 3번째 root인자는 index.js를 참조할지안할지
  },
  remove({ commit }, payload) {
    commit( 'removeMainPost', payload);
  },
  addComment({ commit }, payload) {
    commit('addComment', payload);
  },
}
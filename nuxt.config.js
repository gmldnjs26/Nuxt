module.exports = {
  server: {
    port: 3000,
  },
  head: {
      title: 'NodeBird',
  },
  modules: [
    '@nuxtjs/axios',
  ],
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  vuetify: {},
  axios: {
    browserBaseURL: 'http://localhost:3087',
    baseURL: 'http://localhost:3087',
    https: false,
  }
};

export default {
  /*
  ** Headers of the page
  */
  target: 'static',
  head: {
    title: '3 x 13',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '12 Journeys. 8 Countries. One dance film experience.' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossorigin: true
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,400;0,500;1,400&display=swap'
      }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    // CSS file in the project
    // '~/assets/css/main.css',
    // SCSS file in the project
    '~/assets/css/main.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  components: true,
  plugins: [
    { src: '@/plugins/vimeo.js', ssr: false },
    { src: '@/plugins/fullscreen.js', ssr: false }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    "@nuxtjs/svg"
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    // Simple usage
    ['@nuxtjs/google-analytics', {
      id: process.env.GA_ID || ''
    }]
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: process.env.API_URL
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    vendor: [
      'vue-vimeo-player'
    ],
    extend(config, ctx) {
    }
  }
}

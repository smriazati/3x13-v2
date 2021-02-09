
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
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
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
  netlifyFiles: {
    netlifyToml: {
      build: {
        environment: { FOO: process.env.FOO }
      },
      headers: [
        {
          for: '/*',
          values: {
            'X-Frame-Options': "DENY",
            'X-XSS-Protection': '1; mode=block',
            'cache-control': '',
            'max-age': 0
          }
        }
      ],
    }
  },
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
    extend(config, ctx) {
    }
  }
}

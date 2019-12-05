module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  publicPath: process.env.NODE_ENV === 'production'
      ? '/'
      : '/'
};

// https://cli.vuejs.org/ru/config/#publicpath

// vue-cli-service inspect > output.js можно проинспектировать код webpack

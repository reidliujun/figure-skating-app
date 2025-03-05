module.exports = {
    plugins: [
      require('./node_modules/tailwindcss'),
      require('./node_modules/autoprefixer'),
      require('./node_modules/postcss-flexbugs-fixes'),
      require('./node_modules/postcss-preset-env')({
        autoprefixer: {
          flexbox: 'no-2009'
        },
        stage: 3
      })
    ]
  }
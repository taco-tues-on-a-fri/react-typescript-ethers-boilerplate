module.exports = {
  syntax: 'postcss-scss',
  plugins: [
    require('postcss-preset-env')({
      browsers: 'last 2 versions',
    }),
    require('precss'),
    require('autoprefixer')
  ]
}
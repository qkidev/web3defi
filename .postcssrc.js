// https://github.com/michael-ciniawsky/postcss-load-config
const pxtorem = require('postcss-pxtorem')

module.exports = {
  plugins: {
    // to edit target browsers: use "browserslist" field in package.json
    autoprefixer: {},
    'postcss-pxtorem': {
      rootValue: 32, // 设计稿是750设置32,设计稿是375 rootValue设置为16，需要和rem.js配合使用
      selectorBlackList: [ // 不需要px转为rem的类名单。
        // '.van-swipe__indicators'
      ],
      propList: ['*'],
    },
  },
}

const path = require('path');

const resolve = dir => {
  return path.join(__dirname, dir);
};

module.exports = {
  chainWebpack: config => {
    // 是一个函数，会接收一个基于 webpack-chain 的 ChainableConfig 实例。允许对内部的 webpack 配置进行更细粒度的修改。
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('_c', resolve('src/components'));
    config.plugin('html').tap(args => {
      args[0].title = 'music';
      return args;
    });
    config.output.filename('[name].[hash].js').end();
  },
  devServer: {
    disableHostCheck: true,
    port: 9000,
    host: '0.0.0.0',
    https: false,
    open: false, // 自动打开浏览器
    proxy: {
      '/api': {
        target: process.env.VUE_APP_BASE_URL,
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
};

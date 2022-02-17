const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: '/mgdoc/',
  productionSourceMap: process.env.NODE_ENV === 'production' ? false : true,
  css: {
    sourceMap: process.env.NODE_ENV === 'production' ? false : true,
    loaderOptions: {}
    //extract: false
  },
  filenameHashing: false,
  transpileDependencies: [/[/\\]node_modules[/\\]minglui*/],
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@ass', resolve('src/assets'))
      .set('@img', resolve('./src/assets/img'))
      .set('@com', resolve('src/components'))
      .set('@v', resolve('src/views'))
      .set('@data', resolve('src/data'))
      //.set('@app', resolve(`src/app/${runAppName}`))
      .set('@font', resolve('src/assets/font'));
    // .set('@minglui', 'W:\\Project\\Mingl\\vue\\minglui');

    // config.plugin('html').tap((args) => {
    //   //args[0].title = '';
    //   return args;
    // });
  },
  devServer: {
    // port: '8080', // 设置端口号
    proxy: {
      '/api': {
        target: 'http://localhost:5000', //代理接口
        changeOrigin: true,
        pathRewrite: {
          // '^/api': '/api' //代理的路径
        }
      },
      '/0/': {
        target: 'http://localhost:5000/0/', //代理接口
        changeOrigin: true,
        pathRewrite: {
          '^/0': '' //代理的路径
        }
      }
    }
  }
};

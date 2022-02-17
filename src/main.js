import MgDoc from './index';

new MgDoc({
  options: {
    docBaseApiUrl: '/api', //文档接口前置地址
    page: '' //页面地址
  }
}).run();

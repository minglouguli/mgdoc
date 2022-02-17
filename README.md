#### mgdoc

提供一个 api 接口说明文档和运行的页面；需配合 asp.net core 3.0 后端添加 Mingl.MgDoc 包

##### install

```
npm install mgdoc --save-dev
```

##### 使用

```
//新建 mgdoc.js 文件

import MgDoc from 'mgdoc';
import MgDoc from 'mgdoc/lib/mgdoc.css';

new MgDoc({
  options: {
    docBaseApiUrl: '/api',  //文档接口前置地址
    page:'/mgdoc'    //页面地址
  }
}).run();
```

##### 配置

```
 pages: {
    index: {
      entry: 'src/main.js'
    },
    mgdoc: {   //这里的mgdoc 需要和mgdoc.js 的page设置一致;
      entry: 'src/mgdoc.js'
    }
  },

```

import Vue from 'vue';
import App from './App.vue';
//import router from './router';
import store from './store';
import { MlCore, MinglUi } from 'minglui';

//script
import ElementUI from 'element-ui';
import Vuesax from 'vuesax';
import MlCodeEditor from 'minglui/src/packages/ml-code-editor';
import MlUrl from './assets/js/mlUrl';
import MgdocEnv from './assets/js/env';
//import vueExt from './assets/js/vueExtension';

import com_0 from './components/mgdoc-env.vue';
import com_1 from './components/mgdoc-req-example.vue';
import com_2 from './components/mgdoc-req-param-arr.vue';
import com_3 from './components/mgdoc-req-param-obj.vue';
import com_4 from './components/mgdoc-req-param-prop.vue';
import com_5 from './components/mgdoc-req-param-value.vue';
import com_6 from './components/mgdoc-req-param-view.vue';
import com_7 from './components/mgdoc-req.vue';
import com_8 from './components/vs-textarea.vue';

//style
import 'element-ui/lib/theme-chalk/index.css';
import 'vuesax/dist/vuesax.css';
import 'minglui/src/packages/style/index.scss';
import './assets/css/index.scss';

import VueRouter from 'vue-router';
import Home from './views/Home.vue';
import P404 from './views/404.vue';
import Login from './views/Login.vue';
import MgApiDoc from './views/MgApiDoc.vue';

const autoInitComponents = [
  com_0,
  com_1,
  com_2,
  com_3,
  com_4,
  com_5,
  com_6,
  com_7,
  com_8
];

class MgDoc {
  options = {};
  constructor(setting) {
    this.options = {
      ...{
        docBaseApiUrl: '', ///api
        title: 'mgdoc',
        page: '', //'/mgdoc',
        mode: 'hash'
      },
      ...setting.options
    };
  }
  run() {
    Vue.use(VueRouter);

    let pagePath = this.options.page;

    const routes = [
      {
        path: `${pagePath}/`,
        name: 'Home',
        // meta: {
        //   auth: true
        // },
        component: Home
      },
      {
        path: `${pagePath}/mgapidoc`,
        name: 'MgApiDoc',
        meta: {
          auth: true
        },
        component: MgApiDoc
      },
      {
        path: `${pagePath}/login`,
        name: 'Login',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Login
      },
      {
        path: '*',
        name: 'NotFund',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: P404
      }
    ];

    const router = new VueRouter({
      mode: this.options.mode,
      base: process.env.BASE_URL,
      routes
    });

    router.beforeEach(async (to, from, next) => {
      if (to.meta.title) {
        document.title = to.meta.title;
      } else {
        document.title = 'MgDoc';
      }

      if (to.matched.some(record => record.meta.auth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.

        let r = await MlCore.$ml.$identity.authenticate({
          pageCode: to.name,
          pageGroup: 'web'
        });

        if (!r) {
          next({
            name: 'Login'
            //query: { redirect: to.fullPath }
          });
        } else {
          next();
        }
      } else {
        next(); // 确保一定要调用 next()
      }
    });

    Vue.config.productionTip = false;
    Vue.use(ElementUI);
    Vue.use(Vuesax);
    Vue.use(MgdocEnv);

    Vue.use(MlUrl, url => {
      return this.options.docBaseApiUrl + url;
    });

    Vue.use(MlCore, mlapp => {
      mlapp.setPluginConfig('ml-go', {
        configHandler: conf => {
          conf.options.timeout = 10000;
          let urlObj = MlUrl.getUrls();
          conf.setUrl(urlObj, 'mgdoc');

          conf.event.mgdoc = {
            error(msg, code) {
              if (code == 401) {
                // 未登录
                router.push({ name: 'Login' });
                return false;
              } else if (code == 403) {
                ///权限不足
              }
            }
          };
        }
      });

      mlapp.setPluginConfig('ml-msg', {
        configHandler: conf => {
          conf.setMsg((_, config) => {
            if (config.type === 1) {
              _.$notify({
                title: '成功',
                message: config.msg,
                type: 'success'
              });
            } else if (config.type === 2) {
              _.$notify.error({
                title: '错误',
                message: config.msg
              });
            } else {
              _.$notify.info({
                message: config.msg
              });
            }
          });
        }
      });

      mlapp.setPluginConfig('ml-identity', {
        configHandler: conf => {
          conf.onAuthenticate(async (identity, pageObj) => {
            if (!identity.isAuthenticated) {
              //如果检查到用户没有登录，则进行服务端检查用户是否有登录以及权限；
              var res = await MlCore.$ml.$go(
                MlUrl.urlKeys.authenticate,
                pageObj
              );
              if (res.data.data.isAuthenticated) {
                identity.signIn(res.data);
              }
            }
            return identity.isAuthenticated;
          });
        }
      });
    });

    MlCore.load([MinglUi, MlCodeEditor], [...autoInitComponents]);

    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app');
  }
}

export default MgDoc;

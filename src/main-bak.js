// import Vue from 'vue';
// import App from './App.vue';
// import router from './router';
// import store from './store';
// import MlCore from 'minglui';

// //script
// import ElementUI from 'element-ui';
// import Vuesax from 'vuesax';
// import autoInitComponents from './autoCode/automComponents';
// import mlCodeEditor from 'minglui/lib/packages/ml-code-editor';
// //import vueExt from './assets/js/vueExtension';

// //style
// import 'element-ui/lib/theme-chalk/index.css';
// import 'vuesax/dist/vuesax.css';
// //import 'minglui/lib/core/minglui.css';
// import 'minglui/lib/packages/ml-code-editor.css';
// import './assets/css/index.scss';

// Vue.config.productionTip = false;
// Vue.use(ElementUI);
// Vue.use(Vuesax);

// Vue.prototype.$getSysVar = function (id) {
//   let sysVarObj = {};
//   let sysVariateCache = this.$ml.getStore('mgdoc_sysVariateListCache');
//   if (sysVariateCache) {
//     try {
//       sysVarObj = JSON.parse(sysVariateCache);
//     } catch (error) {
//       sysVarObj = {};
//     }
//   }

//   let items = sysVarObj[`env_${id}`];
//   let hostValue = '';
//   if (items) {
//     let v = items.firstOrDefault(f => f.key == '$host');
//     hostValue = (v && v.value) || '';
//   }

//   let sysVariateList = [
//     {
//       key: '$host',
//       value: hostValue,
//       des: '服务URL前缀'
//     }
//   ];
//   return sysVariateList;
// };
// Vue.prototype.$getSysVarValue = function (key, id) {
//   if (!id) {
//     var envInfo = this.$ml.getCache('mgdoc_currentInfo');

//     if (!envInfo || !envInfo.envInfo || !envInfo.envInfo.id) {
//       this.$errorMsg('请选择运行环境');
//       return;
//     }
//     id = envInfo.envInfo.id;
//   }
//   let items = this.$getSysVar(id);
//   let defaultValue = '';
//   if (key == '$host') {
//     defaultValue = `${window.document.location.protocol}//${window.document.location.host}`;
//   }
//   if (items) {
//     let v = items.firstOrDefault(f => f.key == key);
//     return (v && v.value) || defaultValue;
//   }
//   return defaultValue;
// };

// Vue.use(MlCore, mlapp => {
//   mlapp.setPluginConfig('ml-go', {
//     configHandler: conf => {
//       conf.options.timeout = 10000;
//       conf.setInterceptors(interceptors => {
//         interceptors.response.use(
//           response => {
//             if (response.data.code && response.data.code == 401) {
//               router.push({ name: 'Login' });
//             }
//             return response;
//           },
//           error => {
//             return Promise.reject(error);
//           }
//         );
//       });
//     }
//   });

//   mlapp.setPluginConfig('ml-msg', {
//     configHandler: conf => {
//       conf.setMsg((_, config) => {
//         if (config.code === 1) {
//           _.$notify({
//             title: '成功',
//             message: config.text,
//             type: 'success'
//           });
//         } else if (config.code === 0) {
//           _.$notify.error({
//             title: '错误',
//             message: config.text
//           });
//         } else {
//           _.$notify.info({
//             message: config.text
//           });
//         }
//       });
//     }
//   });

//   mlapp.setPluginConfig('ml-identity', {
//     configHandler: conf => {
//       conf.setAutenticateHandler(async (identity, pageObj) => {
//         if (!identity.isAuthenticated) {
//           var res = await window.$go('/api/auth/Authenticate', pageObj);
//           if (res.data.isAuthenticated) {
//             identity.authenticate(res.data);
//           }
//         }
//       });
//     }
//   });

//   //mlapp.config.$theme = mlapp.getStorn('theme:' + 0) || 'ms-theme-blue';
//   //mlapp.updateData('_enum', enumData);
//   //mlapp.setLang(lang);

//   //其他组件全局配置
//   mlapp.setPluginConfig('ml-enum', {
//     // getOptionsHandler(v) {
//     //   v.
//     //   return [];
//     // },
//     cache: false
//   });

//   mlapp.setPluginConfig('ml-enum-select', {
//     cache: false
//   });

//   mlapp.setPluginConfig('ml-auth', {
//     url: '/api/auth/operateauth',
//     cache: true
//   });
//   //扩展vue 过滤器、方法等；
//   // vueExt(Vue, mlapp);
// });

// MlCore.load([mlCodeEditor], [...autoInitComponents]);

// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app');

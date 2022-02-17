class MgDocEnv {
  #localSysVarStoreName = 'mgdoc_sysVariateListCache';
  #currentEnvInfoCacheName = 'mgdoc_currentInfo';
  install(Vue) {
    let _env = this;
    Vue.prototype.$getSysVar = function (id) {
      if (!id) {
        let envInfo = this.$getCurrentEnvInfo();
        if (!envInfo) {
          return;
        }
        id = envInfo.envInfo.id;
      }

      let sysVarObj = {};
      let sysVariateCache = this.$ml.getStore(_env.#localSysVarStoreName);
      if (sysVariateCache) {
        try {
          sysVarObj = JSON.parse(sysVariateCache);
        } catch (error) {
          sysVarObj = {};
        }
      }

      let items = sysVarObj[`env_${id}`] || [];

      if (items) {
        let v = items.firstOrDefault(f => f.key == '$host');
        if (!v) {
          items.push({
            key: '$host',
            value: '',
            des: '服务URL前缀'
          });
        }
      }

      return items;
    };
    Vue.prototype.$getSysVarValue = function (key, id) {
      if (!id) {
        let envInfo = this.$getCurrentEnvInfo();
        if (!envInfo) {
          return;
        }

        id = envInfo.envInfo.id;
      }
      let items = this.$getSysVar(id);
      let defaultValue = '';
      if (key == '$host') {
        defaultValue = `${window.document.location.protocol}//${window.document.location.host}`;
      }
      if (items) {
        let v = items.firstOrDefault(f => f.key == key);
        return (v && v.value) || defaultValue;
      }
      return defaultValue;
    };
    Vue.prototype.$getCurrentEnvInfo = function () {
      var envInfo = this.$ml.getCache(_env.#currentEnvInfoCacheName);
      if (!envInfo || !envInfo.envInfo || !envInfo.envInfo.id) {
        this.$errorMsg('请选择运行环境');
        return null;
      } else {
        return envInfo;
      }
    };
    Vue.prototype.$updateSysVar = function (id, list) {
      let sysVarObj = {};
      let sysVariateCache = this.$ml.getStore(_env.#localSysVarStoreName);
      if (sysVariateCache) {
        try {
          sysVarObj = JSON.parse(sysVariateCache);
        } catch (error) {
          sysVarObj = {};
        }
      }
      sysVarObj[`env_${id}`] = list;
      this.$ml.setStore(_env.#localSysVarStoreName, JSON.stringify(sysVarObj));
    };
  }
}
export default new MgDocEnv();

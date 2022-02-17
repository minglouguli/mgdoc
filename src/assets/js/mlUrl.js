class MlUrl {
  #urls = {
    signIn: '/mgdoc/auth/signin',
    signOut: '/mgdoc/auth/signout',
    getUserInfo: '/mgdoc/auth/getUserInfo',
    authenticate: '/mgdoc/auth/authenticate',
    getMgDocTree: '/mgdoc/getMgDocTree',
    getDocEnvList: '/mgdoc/getDocEnvList',
    addEnv: '/mgdoc/addEnv',
    getEnvInfo: '/mgdoc/getEnvInfo',
    delEnv: '/mgdoc/delEnv',
    editEnv: '/mgdoc/editEnv',
    addEnvVariate: '/mgdoc/addEnvVariate',
    editEnvVariate: '/mgdoc/editEnvVariate',
    delEnvVariate: '/mgdoc/delEnvVariate',
    getMgReqDes: '/mgdoc/GetMgReqDes',
    getReqExampleList: '/mgdoc/GetReqExampleList',
    updateMgRequest: '/mgdoc/UpdateMgRequest',
    addReqExample: '/mgdoc/AddReqExample',
    getReqExample: '/mgdoc/GetReqExample',
    editReqExample: '/mgdoc/EditReqExample',
    delReqExample: '/mgdoc/delReqExample'
  };
  urlKeys = {};
  install(Vue, urlHanlder) {
    var defaultHandler = url => url;
    urlHanlder = urlHanlder || defaultHandler;

    for (const key in this.#urls) {
      if (Object.hasOwnProperty.call(this.#urls, key)) {
        this.#urls[key] = urlHanlder(this.#urls[key]);
        this.urlKeys[key] = '@' + key;
      }
    }

    Vue.prototype.$url = this.urlKeys;
  }
  getUrls() {
    return this.#urls;
  }
}

export default new MlUrl();

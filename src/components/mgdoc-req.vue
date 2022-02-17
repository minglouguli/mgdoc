<template>
  <div v-if="show" class="mss-req" ref="mgdocReq">
    <div class="mss-req-seg3">
      <el-tabs v-model="reqInnerTab" class="ms-tabs--row">
        <el-tab-pane label="文档" name="first">
          <div style="height: 100%; display: flex; flex-direction: column">
            <div class="mss-req-seg1">
              <div class="mss-req-path">
                <div class="mss-req-path-method">
                  <span class="ms-info--primary">{{ reqData.method }}</span>
                </div>
                <div class="mss-req-path-domain">{{ currentDomain }}</div>
                <div class="mss-req-path-url">
                  <el-input
                    class="mss-input"
                    v-model="reqData.path"
                    size="mini"
                  >
                    <i
                      @click="copyUrl"
                      class="el-icon-document-copy el-input__icon mss-input-btn"
                      slot="suffix"
                    >
                    </i
                  ></el-input>
                </div>
                <div class="mss-req-path-btn" style="width: 160px">
                  <vs-button icon @click="getReqData">
                    <i class="el-icon-refresh-right"></i>
                  </vs-button>
                  <vs-button color="#7d33ff" @click="saveReq(true)">
                    保存
                  </vs-button>
                </div>
              </div>
            </div>
            <div style="flex: 1; overflow: auto">
              <div class="mss-req-seg2">
                <div class="mss-req-des">
                  <el-divider content-position="left">说明</el-divider>
                  <div class="mss-req-seg0">
                    <div class="mss-req-title">请求名称</div>

                    <vs-input
                      class="mss-req-title-1"
                      border
                      v-model="reqData.title"
                      placeholder="请求名称"
                    />
                  </div>
                  <el-input
                    spellcheck="false"
                    type="textarea"
                    style="font-size: 0.9rem; color: gray"
                    :autosize="{ minRows: 2, maxRows: 6 }"
                    :placeholder="reqData.description"
                    v-model="reqData.c_description"
                  >
                  </el-input>
                </div>
              </div>

              <el-collapse v-model="collapseValue">
                <div
                  v-if="
                    reqData.context &&
                    reqData.context.body &&
                    reqData.context.body.list
                  "
                >
                  <!-- <el-divider content-position="left">请求Body</el-divider> -->

                  <div
                    v-for="item in reqData.context.body.list"
                    :key="item.contentType"
                  >
                    <el-collapse-item title="请求Body" name="1">
                      <div class="mss-req-bodyinfo">
                        <span class="mss-req-contentType">{{
                          item.contentType
                        }}</span>
                        <vs-button flat @click="copyJson(item)">
                          <i class="el-icon-document-copy"></i>
                        </vs-button>
                      </div>

                      <!-- <div>{{ item.c_description || item.description }}</div> -->
                      <mgdoc-req-param-view
                        style="max-height: 400px; overflow: auto"
                        v-model="item.keys"
                      ></mgdoc-req-param-view>

                      <!-- <div class="mss-req-body-paramdes">
                    <div v-for="param in item.keys" :key="param.code">
                      <mgdoc-req-param-arr
                        v-if="param.type == 'array'"
                        :arrDes="param"
                      >
                      </mgdoc-req-param-arr>

                      <mgdoc-req-param-obj
                        v-else-if="param.type == 'object'"
                        :objDes="param"
                      ></mgdoc-req-param-obj>

                      <mgdoc-req-param-prop
                        v-else
                        :prop="param"
                      ></mgdoc-req-param-prop>
                    </div>
                  </div> -->
                    </el-collapse-item>
                  </div>

                  <!-- <el-divider content-position="left">响应Body</el-divider> -->
                </div>

                <el-collapse-item title="响应Body" name="2" disabled>
                  <template slot="title">
                    <div class="mss-req-response-title">
                      <div>响应Body</div>

                      <vs-button
                        flat
                        @click.stop="
                          dialog1ActiveHandler(reqData.context.response)
                        "
                        size="small"
                        style="display: block; height: 30px; margin-left: 2rem"
                      >
                        添加响应
                      </vs-button>
                    </div>
                  </template>
                  <div v-if="reqData.context.response.responseList">
                    <el-tabs
                      class="ms-tabs--row"
                      style="min-height: 200px"
                      v-model="responseTabValue"
                    >
                      <el-tab-pane
                        v-for="(res, i) in reqData.context.response
                          .responseList"
                        :key="res.no"
                        :name="res.no"
                        :label="res.title"
                      >
                        <span slot="label" class=""> {{ res.title }}</span>

                        <div
                          style="
                            padding: 0 2rem;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                          "
                        >
                          <div style="display: flex; align-items: center">
                            响应数据
                            <vs-button
                              title="复制说明的数据"
                              style="margin-left: 260px"
                              flat
                              @click="copyJson({ keys: res.bodyDes })"
                            >
                              <i class="el-icon-document-copy"></i>
                            </vs-button>
                            <vs-button
                              dark
                              flat
                              @click="
                                arrMove(
                                  reqData.context.response.responseList,
                                  i,
                                  -1
                                )
                              "
                            >
                              <i class="el-icon-back"></i>
                            </vs-button>
                            <vs-button
                              dark
                              flat
                              @click="
                                arrMove(
                                  reqData.context.response.responseList,
                                  i,
                                  1
                                )
                              "
                            >
                              <i class="el-icon-right"></i>
                            </vs-button>
                          </div>
                          <div>
                            <vs-button
                              title="删除响应说明"
                              flat
                              danger
                              @click="
                                arrDel(reqData.context.response.responseList, i)
                              "
                            >
                              <i class="el-icon-delete"></i>
                            </vs-button>
                          </div>
                        </div>
                        <div
                          style="
                            display: flex;
                            align-items: flex-start;
                            width: 100%;
                            padding: 0 2rem;
                            box-sizing: border-box;
                          "
                        >
                          <el-input
                            spellcheck="false"
                            style="flex: 0 0 32%; font-size: 0.9rem"
                            type="textarea"
                            :rows="16"
                            placeholder="请输入内容"
                            v-model="res.bodyText"
                          >
                          </el-input>

                          <div style="flex: 1">
                            <mgdoc-req-param-view
                              style="
                                width: 100%;
                                height: 300px;
                                overflow: auto;
                                border-radius: 6px;
                                box-shadow: 0 0 6px #e4e4e4;
                              "
                              v-model="res.bodyDes"
                            ></mgdoc-req-param-view>
                          </div>
                        </div>
                      </el-tab-pane>
                    </el-tabs>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="运行" name="second" lazy>
          <div style="height: 100%; display: flex; flex-direction: column">
            <div class="mss-req-seg1">
              <div class="mss-req-path">
                <div class="mss-req-path-method">
                  <span class="ms-info--primary">{{ request.method }}</span>
                </div>
                <div class="mss-req-path-domain">{{ currentDomain }}</div>
                <div class="mss-req-path-url">
                  <el-input
                    class="mss-input"
                    v-model="request.path"
                    size="mini"
                  ></el-input>
                </div>
                <div class="mss-req-path-btn" style="width: 160px">
                  <vs-button color="#7d33ff" @click="dialog2.active = true">
                    保存为示例
                  </vs-button>
                  <vs-button icon @click="runRequest(request)">
                    <i class="el-icon-s-promotion"></i>
                  </vs-button>
                </div>
              </div>
            </div>
            <div class="mss-req-request" style="flex: 1; overflow: auto">
              <div class="mss-req-request-s1">
                <div class="mss-req-request-query">query</div>
              </div>
              <el-divider content-position="left">请求参数</el-divider>
              <div class="mss-req-request-s2">
                <div class="mss-req-request-header">
                  <div>
                    <div
                      v-for="(item, i) in request.header"
                      :key="i"
                      class="mss-req-request-header-item"
                    >
                      <el-checkbox
                        v-model="item.checked"
                        class="mss-req-request-header-check"
                      ></el-checkbox>
                      <el-input
                        class="mss-input mss-req-request-header-key"
                        v-model="item.key"
                        size="mini"
                      ></el-input>
                      <el-input
                        class="mss-input mss-req-request-header-value"
                        v-model="item.value"
                        size="mini"
                      ></el-input>
                      <el-button
                        round
                        size="mini"
                        @click="delHeader(request.header, i)"
                        ><i class="el-icon-delete"></i
                      ></el-button>
                    </div>
                    <div style="margin-top: 1rem">
                      <el-button
                        round
                        size="mini"
                        @click="addHeader(request.header)"
                      >
                        添加请求头 <i class="el-icon-plus"></i>
                      </el-button>
                    </div>
                  </div>
                </div>
                <div class="mss-req-request-body">
                  <div>
                    <ml-code-editor
                      v-model="request.body"
                      height="100%"
                      style="
                        height: 270px;
                        box-shadow: 0 0 6px #e1e1e1;
                        border-radius: 0.4rem;
                      "
                    >
                    </ml-code-editor>
                    <!-- 
                  <el-input
                    spellcheck="false"
                    style="width: 100%"
                    type="textarea"
                    :rows="12"
                    placeholder="请输入内容"
                    v-model="request.body"
                  >
                  </el-input> -->
                  </div>
                </div>
              </div>
              <br />
              <el-divider>
                <vs-button icon circle floating @click="runRequest(request)">
                  <i class="el-icon-caret-right"></i>
                </vs-button>
              </el-divider>

              <div class="mss-req-request-s3">
                <div>
                  <div class="ms-flex ms-flex--item-center">
                    响应结果：
                    <div
                      v-if="request.responseStatus"
                      class="mss-req-responseStatus"
                      :class="request.responseStatus"
                    >
                      {{ request.responseStatus }}
                    </div>
                  </div>
                  <div class="mss-req-request-response-body">
                    <ml-code-editor
                      v-model="request.responseText"
                      height="100%"
                      style="
                        height: 270px;
                        box-shadow: 0 0 6px #e1e1e1;
                        border-radius: 0.4rem;
                      "
                    >
                    </ml-code-editor>

                    <!-- <el-input
                    style="width: 100%"
                    type="textarea"
                    readonly
                    :autosize="{ minRows: 6, maxRows: 12 }"
                    placeholder="响应结果"
                    v-model="request.responseText"
                  >
                  </el-input> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="示例" name="third" lazy>
          <el-tabs
            v-model="activeExampleId"
            tab-position="left"
            style="width: 100%"
            class="ms-tabs--col"
          >
            <el-tab-pane
              v-for="(item, i) in reqExampleList"
              :key="item.id"
              :name="'tab-' + item.id"
              :label="item.title"
              lazy
            >
              <mgdoc-req-example
                :exampleId="item.id"
                :runRequestHandler="runRequest"
                @delExample="() => delExampleHandler(reqExampleList, i, item)"
              ></mgdoc-req-example>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
        <el-tab-pane label="测试" name="fourth" lazy
          >测试,加入其他请求，流程测试，特殊请求参数测试</el-tab-pane
        >
      </el-tabs>
    </div>

    <vs-dialog
      width="1200px"
      not-center
      v-model="dialog1.active"
      prevent-close
      blur
      class="mgdoc-css"
    >
      <!-- <template #header>
        <h4 class="not-margin">请输入响应名称</h4>
      </template> -->

      <div
        class="con-content"
        style="
          text-align: left;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
        "
      >
        <div
          style="display: flex; align-items: center; justify-content: center"
        >
          <span style="font-size: 0.8rem; color: gray">响应示例：</span>
          <vs-button transparent @click="setDialog1Value('成功响应', 1)">
            成功响应
          </vs-button>
          <vs-button transparent danger @click="setDialog1Value('失败响应', 2)">
            失败响应
          </vs-button>
        </div>
        <div style="display: flex; align-items: center">
          响应名称:
          <vs-input
            style="width: 200px; align-self: flex-start"
            class="ms-vs-input"
            v-model="dialog1.value"
            placeholder="请输入响应名称"
          ></vs-input>
        </div>

        <!-- <ml-code-editor
          v-model="dialog1.jsonValue"
          height="100%"
          style="
            height: 300px;
            width: 400px;
            box-shadow: 0 0 6px #e1e1e1;
            border-radius: 0.4rem;
          "
        >
        </ml-code-editor> -->

        <el-divider content-position="left">响应数据</el-divider>
        <div
          style="
            display: flex;
            align-items: flex-start;
            width: 100%;
            padding: 0 2rem;
            box-sizing: border-box;
          "
        >
          <el-input
            spellcheck="false"
            style="flex: 0 0 400px; font-size: 0.9rem"
            type="textarea"
            :rows="21"
            placeholder="请输入内容"
            v-model="dialog1.jsonValue"
          >
          </el-input>

          <!-- <vs-textarea
            :rows="20"
            style="width: 400px; align-self: flex-start; margin-top: 2rem"
            primary
            v-model="dialog1.jsonValue"
            label="响应数据"
          /> -->
          <div>
            <vs-button
              style="height: 30px"
              @click="buildJsonDes(dialog1.jsonValue)"
              >生成描述</vs-button
            >
            <vs-button flat @click="copyJson({ keys: dialog1.jsonDes })">
              <i class="el-icon-document-copy"></i>
            </vs-button>
          </div>

          <div style="flex: 1">
            <mgdoc-req-param-view
              style="
                width: 100%;
                height: 400px;
                overflow: auto;
                border-radius: 6px;
                box-shadow: 0 0 6px #e4e4e4;
              "
              v-model="dialog1.jsonDes"
            ></mgdoc-req-param-view>
          </div>
        </div>
      </div>

      <template #footer>
        <div
          class="con-footer"
          style="display: flex; align-items: center; justify-content: flex-end"
        >
          <vs-button @click="dialog1OkHandler" transparent> 确定 </vs-button>
          <vs-button @click="dialog1.active = false" dark transparent>
            取消
          </vs-button>
        </div>
      </template>
    </vs-dialog>

    <vs-dialog width="400px" v-model="dialog2.active" class="mgdoc-css">
      <template #header>
        <h4 class="not-margin">请输入示例名称</h4>
      </template>

      <div
        class="con-content"
        style="
          text-align: left;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
        "
      >
        <div style="display: flex; align-items: center">
          示例名称:
          <vs-input
            style="width: 200px; align-self: flex-start"
            class="ms-vs-input"
            v-model="dialog2.value"
            placeholder="请输入示例名称"
          ></vs-input>
        </div>
      </div>

      <template #footer>
        <div
          class="con-footer"
          style="display: flex; align-items: center; justify-content: flex-end"
        >
          <vs-button @click="dialog2OkHandler" transparent> 确定 </vs-button>
          <vs-button @click="dialog2.active = false" dark transparent>
            取消
          </vs-button>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>
<style lang="scss" scoped>
.mss-req {
  width: 100%;
  height: 100%;
  text-align: left;
  display: flex;
  flex-direction: column;
  .ms-flex {
    display: flex;
  }
  .ms-flex--item-center {
    align-items: center;
  }
  .ms-info--primary {
    padding: 4px 8px;
    border-radius: 4px;
    margin: 0 4px;
    color: #0381da;
    background-color: #dfeeff;
  }
  .con-footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .mss-input-btn {
    cursor: pointer;
    background-color: rgb(226, 228, 238);
    color: rgb(36, 36, 184);
    border-radius: 4px;
  }
  .mss-req-seg0 {
    display: flex;
    align-items: center;
    margin: 1rem;
    .mss-req-title {
      width: 80px;
      color: gray;
    }
    .mss-req-title-1 {
      &::v-deep {
        .vs-input {
          font-size: 1rem;
          color: #e15b5b;
        }
      }
    }
  }
  .mss-req-seg1 {
    width: 100%;
    padding-bottom: 10px;
    .mss-req-path {
      display: flex;
      align-items: center;
      width: 100%;
      box-shadow: 0 0 10px rgb(196, 196, 196);
      border-radius: 0 0 6px 6px;
      .mss-req-path-method {
        width: 60px;
      }
      .mss-req-path-domain {
        padding-left: 1rem;
      }
      .mss-req-path-url {
        padding-left: 1rem;
        flex: 1;
        .mss-input {
          width: 100%;
        }
      }
      .mss-req-path-btn {
        width: 100px;
        display: flex;
        justify-content: flex-end;
      }
    }
  }
  .mss-req-seg2 {
    margin-bottom: 0.5rem;
  }
  .mss-req-seg3 {
    flex: 1;
    height: 100%;
    //height: calc(100vh - 300px); // 100%;
    overflow: auto;
    .mss-req-contentType {
      background-color: rgb(232, 227, 248);
      color: rgb(113, 68, 238);
      border-radius: 0.4rem;
      font-size: 0.9rem;
      padding: 0.4rem;
    }
    .mss-req-bodyinfo {
      display: flex;
      align-items: center;
    }
    .mss-req-body-paramdes {
      background-color: #fcfcfc;
      padding: 0.5rem;
      border-radius: 6px;
    }
    .mss-req-response-title {
      width: 100%;
      display: flex;
      align-items: center;
    }
    &::v-deep {
      .el-collapse-item__header {
        background-color: rgb(245, 245, 245);
        padding-left: 1rem;
        border-radius: 0.4rem;
      }
    }
  }
  .mss-req-request {
    display: flex;
    flex-direction: column;
    overflow: auto;
    .mss-input {
      width: 150px;
      padding-right: 10px;
    }
    .mss-req-request-s2 {
      display: flex;
      height: 300px;
      .mss-req-request-header {
        padding: 1rem;
        flex: 0 0 400px;
        overflow: hidden;
        overflow-y: auto;
        border-right: 1px solid rgb(190, 190, 190);
        .mss-req-request-header-item {
          margin: 0.2rem 0;
          .mss-req-request-header-check {
            margin-right: 0.5rem;
          }
        }
      }
      .mss-req-request-body {
        padding: 1rem;
        flex: 1;
        overflow: auto;
      }
    }
    .mss-req-request-s3 {
      .mss-req-responseStatus {
        padding: 0.4rem 1rem;
        border-radius: 0.4rem;
        box-shadow: 0 0 6px rgb(194, 194, 194);
        width: fit-content;
        margin: 0rem 1rem;
      }
      .mss-req-responseStatus.success {
        background-color: #2ecc71;
        color: white;
      }
      .mss-req-responseStatus.fail {
        background-color: #e74c3c;
        color: white;
      }
      .mss-req-request-response-body {
        margin-top: 0.5rem;
      }
    }
  }
}
</style>
<script>
export default {
  name: 'mgdoc-req',
  props: {
    reqKey: {
      type: String
    }
  },
  data() {
    return {
      show: false,
      collapseValue: ['1', '2'],
      reqData: {},
      currentDomain:
        this.$getSysVarValue('$host') ||
        `${window.document.location.protocol}//${window.document.location.host}`,
      reqInnerTab: 'first',
      dialog1: {
        active: false,
        value: '',
        jsonValue: '',
        jsonDes: [],
        target: null
      },
      dialog2: {
        active: false,
        value: ''
      },
      responseTabValue: '',
      request: {
        request_id: 0,
        key: '',
        method: '',
        path: '',
        pname: '',
        header: [
          {
            key: 'Content-Type',
            value: 'application/json',
            checked: false
          }
        ],
        body: '',
        query: [],
        responseText: '',
        responseStatus: ''
      },
      reqExampleList: [],
      activeExampleId: '',
      mlR: null
    };
  },
  mounted() {
    this.getReqData();
    this.mlR = this.$ml.MlR().new({
      openTag: '${',
      closeTag: '}'
    });
  },
  methods: {
    getReqData() {
      let _ = this;
      const loading = this.$vs.loading({
        target: _.$refs.mgdocReq
      });

      this.$go(this.$url.getMgReqDes, {
        key: this.reqKey
      })
        .success(d => {
          setTimeout(() => {
            loading.close();
          }, 100);
          this.reqData = d;
          this.getReqExampleList();
          this.show = true;
          if (
            this.reqData.context.response.responseList &&
            this.reqData.context.response.responseList.length > 0
          ) {
            this.responseTabValue =
              this.reqData.context.response.responseList[0].no;
          }
          let item =
            this.reqData.context.body && this.reqData.context.body.list[0];
          this.request.request_id = this.reqData.id;
          this.request.key = this.reqData.key;
          this.request.method = this.reqData.method;
          this.request.path = this.reqData.path;
          this.request.pname = this.reqData.pname;
          if (item) {
            this.request.body = this.jsonDesToJson(item);
          }
        })
        .error(() => {
          loading.close();
        });
    },
    saveReq(refresh) {
      if (this.reqData) {
        this.$go(this.$url.updateMgRequest, this.reqData).success(
          (req, msg) => {
            if (refresh) {
              this.$successMsg(msg);
              this.getReqData();
            }
          }
        );
      }
    },
    copyUrl() {
      this.$ml.copy(this.reqData.path, () => {
        this.$msg('复制成功');
      });
    },
    copyJson(item) {
      let jsonStr = this.jsonDesToJson(item);
      this.$ml.copy(jsonStr, () => {
        this.$msg('复制成功');
      });
    },
    jsonDesToJson(item) {
      let params = [];
      for (let i = 0; i < item.keys.length; i++) {
        const param = item.keys[i];
        if (param.type == 'array') {
          let data = [];
          this.arrDesToJson(data, param);
          params.push(data);
        } else if (param.type == 'object') {
          let data = {};
          this.objDesToJson(data, param);
          params.push(data);
        } else {
          let pvalue = this.proDesToJson(param);
          params.push(pvalue);
        }
      }
      let jsonStr = '';
      if (params.length == 1) {
        jsonStr = JSON.stringify(params[0], null, 2);
      } else if (params.length == 0) {
        jsonStr = '';
      } else {
        jsonStr = JSON.stringify(params, null, 2);
      }
      return jsonStr;
    },
    arrDesToJson(data, des) {
      if (des.items) {
        if (des.items.type == 'object') {
          let indata = {};
          this.objDesToJson(indata, des.items);
          data.push(indata);
        } else {
          data.push(this.proDesToJson(des.items));
        }
      }
    },
    objDesToJson(data, des) {
      if (des.properties) {
        for (let i = 0; i < des.properties.length; i++) {
          const prop = des.properties[i];
          if (prop.type == 'array') {
            data[prop.code] = [];
            this.arrDesToJson(data[prop.code], prop);
          } else if (prop.type == 'object') {
            data[prop.code] = {};
            this.objDesToJson(data[prop.code], prop);
          } else {
            data[prop.code] = this.proDesToJson(prop);
          }
        }
      }
    },
    proDesToJson(des) {
      let v =
        des.c_defaultValue == null || des.c_defaultValue === ''
          ? des.defaultValue
          : des.c_defaultValue;
      if (des.type == 'number') {
        return Number(v) || 0;
      } else if (des.type == 'boolean') {
        return v == true || v == 'true' ? true : false;
      } else {
        return v;
      }
    },
    buildJsonDes(jsonStr) {
      if (!jsonStr) {
        this.$errorMsg('请填写json内容');
      }
      try {
        let json = JSON.parse(jsonStr);
        let des = [this.jsonToJsonDes(null, json)];
        this.dialog1.jsonDes = des;
        console.log(des);
      } catch (error) {
        this.$errorMsg('无效的json格式');
      }
    },
    jsonToJsonDes(key, json) {
      if (json instanceof Array) {
        return {
          c_defaultValue: null,
          c_description: null,
          code: key,
          defaultValue: [],
          description: '',
          fullName: '',
          isRequired: false,
          items: this.jsonToJsonDes(key, json[0]),
          properties: null,
          type: 'array'
        };
      } else if (json instanceof Date) {
        return {
          c_defaultValue: null,
          c_description: null,
          code: key,
          defaultValue: new Date().format('yyyy-MM-dd HH:mm:ss'),
          description: '',
          fullName: '',
          isRequired: false,
          items: null,
          properties: null,
          type: 'date'
        };
      } else if (typeof json === 'object') {
        let properties = [];
        for (const key in json) {
          if (Object.hasOwnProperty.call(json, key)) {
            const element = json[key];
            properties.push(this.jsonToJsonDes(key, element));
          }
        }
        return {
          c_defaultValue: null,
          c_description: null,
          code: key,
          defaultValue: null,
          description: '',
          fullName: '',
          isRequired: false,
          items: null,
          properties: properties,
          type: 'object'
        };
      } else if (typeof json === 'number') {
        return {
          c_defaultValue: null,
          c_description: null,
          code: key,
          defaultValue: json || 0,
          description: '',
          fullName: '',
          isRequired: false,
          items: null,
          properties: null,
          type: 'number'
        };
      } else if (typeof json === 'boolean') {
        return {
          c_defaultValue: null,
          c_description: null,
          code: key,
          defaultValue: json || false,
          description: '',
          fullName: '',
          isRequired: false,
          items: null,
          properties: null,
          type: 'boolean'
        };
      } else if (typeof json === 'string') {
        if (isNaN(new Date(json))) {
          return {
            c_defaultValue: null,
            c_description: null,
            code: key,
            defaultValue: json || '',
            description: '',
            fullName: '',
            isRequired: false,
            items: null,
            properties: null,
            type: 'string'
          };
        } else {
          return {
            c_defaultValue: null,
            c_description: null,
            code: key,
            defaultValue: json || new Date().format('yyyy-MM-dd HH:mm:ss'),
            description: '',
            fullName: '',
            isRequired: false,
            items: null,
            properties: null,
            type: 'date'
          };
        }
      } else {
        return {
          c_defaultValue: null,
          c_description: null,
          code: key,
          defaultValue: '',
          description: '',
          fullName: '',
          isRequired: false,
          items: null,
          properties: null,
          type: 'other'
        };
      }
    },
    arrMove(arr, i, move) {
      let cr = i + move;
      if (move < 0) {
        if (cr >= 0) {
          arr.splice(i - 1, 2, arr[i], arr[i - 1]);
        }
      }
      if (move > 0) {
        if (cr < arr.length) {
          arr.splice(i, 2, arr[i + 1], arr[i]);
        }
      }
    },
    arrDel(arr, i) {
      arr.splice(i, 1);
    },
    dialog1ActiveHandler(item) {
      this.dialog1.target = item;
      this.dialog1.value = '';
      this.dialog1.jsonValue = '';
      this.dialog1.jsonDes = '';
      this.dialog1.active = true;
      return false;
    },
    setDialog1Value(v, code) {
      this.dialog1.value = v;
      if (code === 1) {
        this.dialog1.jsonValue = JSON.stringify(
          {
            isSuccess: true,
            code: 1,
            message: '请求成功',
            data: {}
          },
          null,
          2
        );
        this.buildJsonDes(this.dialog1.jsonValue);
      } else if (code === 2) {
        this.dialog1.jsonValue = JSON.stringify(
          {
            isSuccess: false,
            code: 0,
            message: '请求失败',
            data: null
          },
          null,
          2
        );
        this.buildJsonDes(this.dialog1.jsonValue);
      }
    },
    dialog1OkHandler() {
      if (!this.dialog1.value) {
        this.$errorMsg('请填写响应名称');
        return;
      }
      this.addRequestResponse(
        this.dialog1.target,
        this.dialog1.value,
        this.dialog1.jsonValue,
        this.dialog1.jsonDes
      );
      this.dialog1.value = '';
      this.dialog1.jsonValue = '';
      this.dialog1.jsonDes = '';
      this.dialog1.target = null;
      this.dialog1.active = false;
    },
    addRequestResponse(response, title, text, des) {
      if (!response.responseList) {
        this.$set(response, 'responseList', []);
      }
      let no = this.$ml.token();
      response.responseList.push({
        title: title,
        no: no,
        bodyText: text,
        bodyDes: des
      });
      this.responseTabValue = no;
      this.$successMsg('添加成功，请注意及时保存！');
    },
    addHeader(headers) {
      headers.push({
        key: '',
        value: '',
        checked: true
      });
    },
    delHeader(headers, i) {
      headers.splice(i, 1);
    },
    runRequest(request) {
      let _ = this;

      // 获取当前环境

      let envInfo = this.$getCurrentEnvInfo();
      if (!envInfo) {
        this.$errorMsg('请选择运行环境');
        return;
      }
      let envSysEnvList = this.$getSysVar(envInfo.envInfo.id);
      let envVarList = envInfo.variateList || [];
      let envVarList1 = envInfo.variateList1 || [];

      let envVarObj = {};
      envVarObj['$dateTime'] = new Date().format('yyyy-MM-dd HH:mm:ss');
      envVarObj['$date'] = new Date().format('yyyy-MM-dd');
      envVarObj['$time'] = new Date().format('HH:mm:ss');
      for (let i = 0; i < envSysEnvList.length; i++) {
        const envVar = envSysEnvList[i];
        if (envVar && envVar.key && envVar.value) {
          envVarObj[this.solveEnvVar(envVarObj, envVar.key)] = this.solveEnvVar(
            envVarObj,
            envVar.value
          );
        }
      }
      let hostEnv = envVarObj['$host'];
      if (!hostEnv) {
        envVarObj[
          '$host'
        ] = `${window.document.location.protocol}//${window.document.location.host}`;
      }

      for (let i = 0; i < envVarList.length; i++) {
        const envVar = envVarList[i];
        if (envVar && envVar.key && envVar.value) {
          envVarObj[this.solveEnvVar(envVarObj, envVar.key)] = this.solveEnvVar(
            envVarObj,
            envVar.value
          );
        }
      }

      //处理环境变量；

      let bodyObj = null;

      if (request.body) {
        let ibody = this.solveEnvVar(envVarObj, request.body);
        try {
          bodyObj = JSON.parse(ibody);
        } catch (error) {
          this.$errorMsg('body 格式无效，无法转为JSON对象');
          return;
        }
      }

      let headers = {};

      for (let i = 0; i < envVarList1.length; i++) {
        const header = envVarList1[i];
        if (header.key && header.value) {
          headers[this.solveEnvVar(envVarObj, header.key)] = this.solveEnvVar(
            envVarObj,
            header.value
          );
        }
      }

      if (request.header) {
        for (let i = 0; i < request.header.length; i++) {
          const header = request.header[i];

          if (header.checked && header.key && header.value) {
            headers[this.solveEnvVar(envVarObj, header.key)] = this.solveEnvVar(
              envVarObj,
              header.value
            );
          }
        }
      }

      const loading = this.$vs.loading({
        target: _.$refs.mgdocReq,
        type: 'circles'
      });

      this.$go(this.reqData.path, bodyObj, {
        methods: this.reqData.method,
        headers: headers
      })
        .success((data, msg, code, res) => {
          setTimeout(() => {
            loading.close();
          }, 500);
          this.$successMsg('请求成功');
          if (res.data.origin) {
            delete res.data.origin;
          }
          request.responseStatus = 'success';
          try {
            request.responseText = JSON.stringify(res.data, null, 2);
          } catch (error) {
            console.log('error', error);
          }
        })
        .error((msg, code, data, res) => {
          loading.close();
          if (res.data.origin) {
            delete res.data.origin;
          }
          try {
            request.responseText = JSON.stringify(res.data, null, 2);
          } catch (error) {
            request.responseText = res.data;
            console.log('error', error);
          }
          request.responseStatus = 'fail';
        });
    },
    solveEnvVar(envVarObj, str) {
      return this.mlR.render(str, envVarObj);
    },
    dialog2OkHandler() {
      this.saveAsReqExample();
    },
    saveAsReqExample() {
      if (!this.dialog2.value) {
        this.$errorMsg('请填写示例名称');
        return;
      }
      this.$go_msg(this.$url.addReqExample, {
        request_id: this.request.request_id,
        key: this.request.key,
        method: this.request.method,
        path: this.request.path,
        pname: this.request.pname,
        title: this.dialog2.value,
        query: this.request.query,
        header: this.request.header,
        body: this.request.body,
        responseText: this.request.responseText,
        responseStatus: this.request.responseStatus
      }).success(data => {
        this.dialog2.value = '';
        this.dialog2.active = false;
        this.getReqExampleList();
      });
    },
    getReqExampleList() {
      this.$go(this.$url.getReqExampleList, { id: this.reqData.id }).success(
        data => {
          this.reqExampleList = data.list;
          if (this.reqExampleList.length > 0) {
            if (!this.activeExampleId) {
              this.activeExampleId = 'tab-' + this.reqExampleList[0].id;
            }
          }
        }
      );
    },
    delExampleHandler(list, i, exmple) {
      console.log('aaaa', this.activeExampleId, i);
      if (i > 0) {
        this.activeExampleId = 'tab-' + list[i - 1].id;
      } else if (list.length > i + 1) {
        this.activeExampleId = 'tab-' + list[i + 1].id;
      } else {
        this.activeExampleId = '';
      }
      list.splice(i, 1);
    }
  }
};
</script>

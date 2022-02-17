<template>
  <div v-if="request" class="mgdoc-req-example">
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
          <vs-button color="#7d33ff" @click="saveExample"> 保存 </vs-button>
          <vs-button style="margin-left: 2rem" danger icon @click="delExample">
            <i class="el-icon-delete"></i>
          </vs-button>
        </div>
      </div>
    </div>
    <div class="mss-req-request">
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
              <el-button round size="mini" @click="delHeader(request.header, i)"
                ><i class="el-icon-delete"></i
              ></el-button>
            </div>
            <div style="margin-top: 1rem">
              <el-button round size="mini" @click="addHeader(request.header)">
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.mgdoc-req-example {
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
  name: 'mgdoc-req-example',
  props: {
    exampleId: {
      type: Number,
      required: true
    },
    runRequestHandler: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      currentDomain:
        this.$getSysVarValue('$host') ||
        `${window.document.location.protocol}//${window.document.location.host}`,
      request: null
    };
  },
  mounted() {
    this.getReqExample();
  },
  methods: {
    getReqExample() {
      this.$go(this.$url.getReqExample, { id: this.exampleId }).success(
        data => {
          this.request = data;
        }
      );
    },
    saveExample() {
      this.$go_msg(this.$url.editReqExample, this.request).success(data => {});
    },
    delExample() {
      this.$go_msg(this.$url.delReqExample, { id: this.request.id }).success(
        data => {
          this.$emit('delExample');
        }
      );
    },
    runRequest(request) {
      this.runRequestHandler(request);
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
    }
  }
};
</script>

<template>
  <div class="home mgdoc-css">
    <div class="left">
      <div class="mss-left-header">
        <el-popover placement="bottom" width="200" trigger="click">
          <vs-avatar
            v-if="!userInfo.avatar"
            slot="reference"
            primary
            size="60"
            badge
            badge-color="success"
          >
            <template #text>
              {{ userInfo.nickName }}
            </template>
          </vs-avatar>

          <vs-avatar
            v-else
            slot="reference"
            primary
            size="60"
            badge
            badge-color="success"
          >
            <img :src="userInfo.avatar" alt="" />
          </vs-avatar>

          <div>
            <div
              style="
                display: flex;
                align-items: center;
                border-bottom: 1px solid #e7e7e7;
                padding-bottom: 1rem;
              "
            >
              <vs-avatar
                v-if="!userInfo.avatar"
                primary
                size="50"
                badge
                badge-color="success"
              >
                <template #text>
                  {{ userInfo.nickName }}
                </template>
              </vs-avatar>
              <vs-avatar v-else primary size="50" badge badge-color="success">
                <img :src="userInfo.avatar" alt="" />
              </vs-avatar>
              <div>
                <div style="padding-left: 1rem">{{ userInfo.account }}</div>
                <div style="padding-left: 1rem; font-size: 12px; color: gray">
                  {{ userInfo.nickName }}
                </div>
              </div>
            </div>

            <vs-button block transparent>
              <i class="el-icon-setting"></i> 设置
            </vs-button>
            <vs-button block transparent @click="signOut">
              <i class="el-icon-sunset"></i> 退出
            </vs-button>
          </div>
        </el-popover>

        <div class="mss-left-header-left">
          <div class="mss-left-home">
            <el-button
              @click="$router.push({ name: 'Home' })"
              circle
              floating
              color="#7d32ff"
              size="small"
            >
              <i class="el-icon-s-home"></i>
            </el-button>

            <el-select
              placeholder="选择环境"
              v-model="currentEnv"
              size="mini"
              class="mss-evn-select"
              :popper-class="'mss-env-options'"
              @change="envChange"
            >
              <el-option
                v-for="env in envList"
                :key="env.id"
                :label="env.name"
                :value="env.id"
              >
                <div
                  class="mss-env-select-options"
                  style="
                    min-width: 140px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                  "
                >
                  <div>
                    {{ env.name }}
                  </div>
                  <el-button
                    size="mini"
                    round
                    @click.stop="enveditdialogActiveHandler(env.id)"
                  >
                    <i class="el-icon-edit-outline"></i>
                  </el-button>
                </div>
              </el-option>
              <el-option style="background-color: #ecf0f1" :value="0" label="">
                <div
                  @click.stop="envadddialog.active = true"
                  style="width: 100%"
                >
                  添加环境 <i class="el-icon-plus"></i>
                </div>
              </el-option>
            </el-select>
          </div>
          <div class="mss-search">
            <vs-input
              primary
              v-model="searchValue"
              state="primary"
              placeholder="搜索"
              @keyup.enter="filterHandler"
            />
            <vs-button
              icon
              @click="filterHandler"
              circle
              color="#94aefb"
              size="small"
            >
              <i class="el-icon-search"></i>
            </vs-button>
          </div>
        </div>
      </div>
      <div class="mss-tree-box">
        <el-tree
          ref="reqTree"
          :data="tree"
          :props="defaultProps"
          :filter-node-method="filterNode"
        >
          <template #default="{ data }">
            <div v-if="data.type != 1" class="mss-tree-item">
              {{ data.title }}
            </div>
            <div v-else class="mss-tree-req" @click="addTab(data)">
              <span class="mss-tree-req-method">{{ data.method }} </span>
              <span class="mss-tree-req-path" :title="data.path">
                {{ data.pname
                }}<span
                  class="mss-tree-req-path-des"
                  v-if="data.title || data.description"
                  >({{ data.title || data.description }})
                </span></span
              >
            </div>
          </template>
        </el-tree>
      </div>
    </div>
    <div class="right">
      <el-tabs v-model="activeCode" @tab-remove="closeTab" class="ms-tabs--row">
        <el-tab-pane
          v-for="tab in reqTabs"
          :lazy="true"
          :key="tab.key"
          :label="tab.tabtext"
          :name="tab.key"
          closable
        >
          <req :reqKey="tab.key"></req>
        </el-tab-pane>
      </el-tabs>
    </div>

    <vs-dialog width="300px" not-center v-model="envadddialog.active">
      <template #header>
        <h4 class="not-margin">添加环境</h4>
      </template>

      <div
        class="con-content"
        style="
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        "
      >
        <vs-input
          label="环境名称"
          v-model="envadddialog.name"
          placeholder="环境名称"
        ></vs-input>
        <br />
        <br />
        <vs-input
          label="环境说明"
          v-model="envadddialog.des"
          placeholder="环境说明"
        ></vs-input>
      </div>

      <template #footer>
        <div
          class="con-footer"
          style="display: flex; align-items: center; justify-content: flex-end"
        >
          <vs-button @click="envadddialogOkHandler" transparent>
            确定
          </vs-button>
          <vs-button @click="envadddialog.active = false" dark transparent>
            取消
          </vs-button>
        </div>
      </template>
    </vs-dialog>

    <vs-dialog
      width="800px"
      not-center
      @close="enveditdialogCloseHandler"
      v-model="enveditdialog.active"
      prevent-close
      class="mgdoc-css"
      blur
    >
      <template #header>
        <h4 class="not-margin">环境设置</h4>
      </template>

      <mgdoc-env ref="mgdocenv"></mgdoc-env>

      <template #footer>
        <div
          class="con-footer"
          style="display: flex; align-items: center; justify-content: flex-end"
        >
          <vs-button @click="enveditdialog.active = false" dark transparent>
            关闭
          </vs-button>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>
<style lang="scss" scoped>
.home {
  display: flex;
  width: 100%;
  height: 100%;
  text-align: left;
  box-sizing: border-box;
  ::v-deep.el-tabs__header {
    user-select: none;
  }
  .left {
    flex: 0 0 400px;
    overflow: hidden;
    background-color: rgb(245, 245, 245);
    border-right: 1px solid rgb(211, 211, 211);
    display: flex;
    flex-direction: column;
    height: 100%;
    .mss-left-header {
      display: flex;
      // flex-direction: column;
      padding: 0.2rem 1rem;
      align-items: center;
      .mss-left-header-left {
        padding-left: 1rem;
      }
      .mss-left-home {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
        height: 36px;
      }
      .mss-search {
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .mss-evn-select {
      width: 160px;
      margin-left: 1rem;
      // box-shadow: 0 4px 6px #e3d6f7;
    }
    .mss-env-select-options {
      min-width: 200px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .mss-tree-box {
      overflow-y: auto;
      height: 100%;
    }
    .mss-tree-req {
      width: 100%;
      .mss-tree-req-method {
        display: inline-block;
        width: 40px;
        color: #16a085;
      }
      .mss-tree-req-path {
        color: #34495e;
      }
      .mss-tree-req-path-des {
        margin-left: 0.5rem;
        color: #7f8c8d;
      }
    }
  }
  .right {
    flex: 1;
    padding: 1rem;
    overflow: hidden;
    ::v-deep {
      .ms-tabs--row.el-tabs {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        .el-tabs__content {
          height: 100%;
          flex: 1;
          overflow: auto;
          .el-tab-pane {
            height: 100%;
          }
        }
      }
      .ms-tabs--col.el-tabs {
        display: flex;
        width: 100%;
        height: 100%;
        .el-tabs__content {
          height: 100%;
          flex: 1;
          overflow: auto;
          .el-tab-pane {
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
<script>
import req from '../components/mgdoc-req.vue';
export default {
  name: 'MgApiDoc',
  components: { req },
  data() {
    return {
      userInfo: {},
      currentEnv: '',
      envList: [],
      searchValue: '',
      tree: [],
      defaultProps: {
        label: function (a) {
          return a.title || a.path;
        },
        children: 'nodes'
        // children(a) {
        //   return a.nodes || a.requests;
        // }
      },
      activeCode: '',
      reqTabs: [],
      envadddialog: {
        active: false,
        name: '',
        des: ''
      },
      enveditdialog: {
        active: false
      }
    };
  },
  mounted() {
    this.getUserInfo();
    this.getEnvList();
    this.getTree();
  },
  methods: {
    getEnvList() {
      this.$go(this.$url.getDocEnvList).success(data => {
        this.envList = data.list;
        if (!this.currentEnv) {
          this.currentEnv =
            Number(this.$ml.getStore('mgdoc_currentEnvId')) || '';
        }
        if (this.currentEnv) {
          if (!this.envList.any(a => a.id == this.currentEnv)) {
            this.currentEnv = this.envList[0].id;
          }
        } else {
          this.currentEnv = this.envList[0].id;
        }

        if (this.currentEnv) {
          this.envChange(this.currentEnv);
        }
      });
    },
    getTree() {
      this.$go(this.$url.getMgDocTree, null, { method: 'get' }).success(
        data => {
          // console.log(data);
          this.tree = data.tree;
        }
      );
    },
    filterNode(value, data) {
      if (!value) return true;
      value = value.toLowerCase();
      return (
        (data.pname || '').toLowerCase().indexOf(value) !== -1 ||
        (data.title || data.description || '').toLowerCase().indexOf(value) !==
          -1
      );
    },
    filterHandler() {
      this.$refs.reqTree.filter(this.searchValue);
    },
    addTab(item) {
      // item.key = 'tab-' + item.path;
      //  let spath = item.path.substring(item.path.lastIndexOf('/') + 1);
      item.tabtext = item.title || item.description || item.pname;
      if (!this.reqTabs.any(a => a.key == item.key)) {
        this.reqTabs.push(item);
      }
      this.activeCode = item.key;
    },
    closeTab(targetCode) {
      let activeCode = this.activeCode;
      let tabs = this.reqTabs;
      if (activeCode === targetCode) {
        tabs.forEach((tab, index) => {
          if (tab.key === targetCode) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeCode = nextTab.key;
            }
          }
        });
      }
      this.activeCode = activeCode;
      this.reqTabs = this.reqTabs.remove(f => f.key == targetCode);
    },
    envadddialogOkHandler() {
      if (!this.envadddialog.name) {
        this.$errorMsg('请填写环境名称');
      }
      this.$go_msg(this.$url.addEnv, {
        name: this.envadddialog.name,
        des: this.envadddialog.des
      }).success(data => {
        this.envadddialog.name = '';
        this.envadddialog.des = '';
        this.getEnvList();
        this.envadddialog.active = false;
      });
    },
    enveditdialogActiveHandler(id) {
      this.enveditdialog.active = true;
      this.$nextTick(() => {
        this.$refs.mgdocenv.getEnv(id);
      });
    },
    enveditdialogCloseHandler() {
      this.getEnvList();
    },
    envChange(envId) {
      if (envId > 0) {
        this.$ml.setStore('mgdoc_currentEnvId', this.currentEnv);
        this.$go(this.$url.getEnvInfo, { id: this.currentEnv }).success(
          data => {
            this.$ml.setCache('mgdoc_currentInfo', data);
          }
        );
      }
    },
    getUserInfo() {
      this.$go(this.$url.getUserInfo).success(data => {
        this.userInfo = data;
      });
    },
    signOut() {
      this.$go_msg(this.$url.signOut).success(data => {
        this.$router.push({
          name: 'Home'
        });
      });
    }
  }
};
</script>

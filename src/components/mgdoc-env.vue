<template>
  <div class="mgdoc-env">
    <div v-if="id > 0">
      <div class="mgdoc-env-title">
        <div class="mgdoc-env-title-name">
          <div style="width: 6rem">环境名称：</div>
          <el-input style="width: 200px" size="mini" v-model="name"></el-input>
        </div>
        <div>
          <el-button round size="mini" type="primary" @click="updateEnv"
            >更新
          </el-button>
          <el-button round size="mini" type="danger" @click="delEnv"
            >删除当前环境
          </el-button>
        </div>
      </div>

      <div class="mgdoc-env-des">
        说明：<el-input v-model="des" size="mini"></el-input>
      </div>

      <el-divider content-position="left">系统变量(只存本地)</el-divider>
      <div class="mss-mgdoc-env-var-list">
        <div
          v-for="(item, i) in sysVariateList"
          :key="i"
          class="mss-mgdoc-env-var-item"
        >
          <el-input
            class="mss-input mss-mgdoc-env-var-key"
            v-model="item.key"
            size="mini"
            placeholder="变量名"
            @change="updateSysVar(item)"
          ></el-input>
          <el-input
            class="mss-input mss-mgdoc-env-var-value"
            v-model="item.value"
            size="mini"
            placeholder="变量值"
            @change="updateSysVar(item)"
          ></el-input>
          <el-input
            class="mss-input mss-mgdoc-env-var-des"
            v-model="item.des"
            size="mini"
            placeholder="变量说明"
            @change="updateSysVar(item)"
          ></el-input>

          <el-button round size="mini" @click="delSysvar(i)"
            ><i class="el-icon-delete"></i
          ></el-button>
        </div>
        <div style="margin-top: 1rem"></div>

        <div style="margin-top: 1rem">
          <el-button round size="mini" @click="addSysVar">
            添加系统变量 <i class="el-icon-plus"></i>
          </el-button>
        </div>
      </div>

      <el-divider content-position="left">环境变量</el-divider>
      <div class="mss-mgdoc-env-var-list">
        <div
          v-for="(item, i) in variateList"
          :key="i"
          class="mss-mgdoc-env-var-item"
        >
          <el-input
            class="mss-input mss-mgdoc-env-var-key"
            v-model="item.key"
            size="mini"
            placeholder="变量名"
            @change="updateVar(item)"
          ></el-input>
          <el-input
            class="mss-input mss-mgdoc-env-var-value"
            v-model="item.value"
            size="mini"
            placeholder="变量值"
            @change="updateVar(item)"
          ></el-input>
          <el-input
            class="mss-input mss-mgdoc-env-var-des"
            v-model="item.des"
            size="mini"
            placeholder="变量说明"
            @change="updateVar(item)"
          ></el-input>
          <el-button round size="mini" @click="delVar(variateList, i, item)"
            ><i class="el-icon-delete"></i
          ></el-button>
        </div>
        <div style="margin-top: 1rem">
          <el-button round size="mini" @click="addVar(variateList, 0)">
            添加环境变量 <i class="el-icon-plus"></i>
          </el-button>
        </div>
      </div>

      <el-divider content-position="left">添加全局请求头</el-divider>

      <div class="mss-mgdoc-env-var-list">
        <div
          v-for="(item, i) in variateList1"
          :key="i"
          class="mss-mgdoc-env-var-item"
        >
          <el-input
            class="mss-input mss-mgdoc-env-var-key"
            v-model="item.key"
            size="mini"
            placeholder="变量名"
            @change="updateVar(item)"
          ></el-input>
          <el-input
            class="mss-input mss-mgdoc-env-var-value"
            v-model="item.value"
            size="mini"
            placeholder="变量值"
            @change="updateVar(item)"
          ></el-input>
          <el-input
            class="mss-input mss-mgdoc-env-var-des"
            v-model="item.des"
            size="mini"
            placeholder="变量说明"
            @change="updateVar(item)"
          ></el-input>
          <el-button round size="mini" @click="delVar(variateList1, i, item)"
            ><i class="el-icon-delete"></i
          ></el-button>
        </div>
        <div style="margin-top: 1rem">
          <el-button round size="mini" @click="addVar(variateList1, 1)">
            添加全局请求头 <i class="el-icon-plus"></i>
          </el-button>
        </div>
      </div>
    </div>
    <div v-else>No Found</div>
  </div>
</template>
<style lang="scss" scoped>
.mgdoc-env {
  width: 100%;
  min-height: 500px;
  text-align: left;
  .mgdoc-env-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .mgdoc-env-title-name {
      display: flex;
      align-items: center;
    }
  }
  .mgdoc-env-des {
    color: gray;
  }
  .mss-mgdoc-env-var-list {
    margin: 1rem 4rem;
    .mss-mgdoc-env-var-item {
      display: flex;
      .mss-input {
        margin-right: 1rem;
      }
    }
  }
}
</style>
<script>
export default {
  name: 'mgdoc-env',
  data() {
    return {
      id: 0,
      name: '',
      des: '',
      sysVariateList: [],
      variateList: [],
      variateList1: []
    };
  },
  methods: {
    getEnv(id) {
      if (id > 0) {
        const loading = this.$vs.loading({
          //target: _.$refs.mgdocReq
        });
        this.$go(this.$url.getEnvInfo, { id: id })
          .success(data => {
            //  console.log('---------');
            this.id = data.envInfo.id;
            this.name = data.envInfo.name;
            this.des = data.envInfo.des;
            this.variateList = data.variateList;
            this.variateList1 = data.variateList1;

            this.sysVariateList = this.$getSysVar(this.id);
            loading.close();
          })
          .error(msg => {
            loading.close();
          });
      }
    },
    delEnv() {
      this.$go_msg(this.$url.delEnv, { id: this.id }).success(data => {
        this.id = 0;
        this.$emit('delenv');
      });
    },
    updateEnv() {
      this.$go_msg(this.$url.editEnv, {
        id: this.id,
        name: this.name,
        des: this.des
      });
    },
    addVar(list, type) {
      this.$go(this.$url.addEnvVariate, {
        env_id: this.id,
        key: '',
        value: '',
        des: '',
        type: type || 0
      }).success(data => {
        list.push(data);
      });
    },
    updateVar(item) {
      this.$go(this.$url.editEnvVariate, item);
    },
    delVar(list, i, item) {
      // console.log(item);
      this.$go_msg(this.$url.delEnvVariate, {
        id: item.id
      }).success(data => {
        list.removeAt(i);
      });
    },
    updateSysVar() {
      this.$updateSysVar(this.id, this.sysVariateList);
    },
    addSysVar() {
      this.sysVariateList.push({
        key: '',
        value: '',
        des: ''
      });
      this.updateSysVar();
    },
    delSysvar(index) {
      this.sysVariateList.removeAt(index);
      this.updateSysVar();
    }
  }
};
</script>

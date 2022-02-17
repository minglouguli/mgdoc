<template>
  <div class="mss-box mgdoc-css">
    <div class="mss-card">
      <vs-input
        class="ms-width--200 mss-input"
        primary
        v-model="submit.ac"
        label-placeholder="账号"
      />

      <vs-input
        class="ms-width--200 mss-input"
        type="password"
        primary
        v-model="submit.pd"
        label-placeholder="密码"
      />
      <vs-button style="width: 100px" class="mss-btn" primary @click="signIn">
        登录
      </vs-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.mss-box {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.mss-card {
  width: 400px;
  height: 200px;
  box-shadow: 0 0 10px rgb(207, 207, 207);
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .mss-input {
    margin: 1rem;
  }
}
</style>

<script>
export default {
  name: 'login',
  data() {
    return {
      submit: {}
    };
  },
  methods: {
    signIn() {
      this.$go_msg(this.$url.signIn, this.submit).success(d => {
        this.$identity.signIn();
        this.$router.push({
          name: 'Home'
        });
      });
    }
  }
};
</script>

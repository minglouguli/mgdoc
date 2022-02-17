<template>
  <div class="mgdoc-home">
    <div><h3>minglsum. mgdoc</h3></div>
    <div>
      <div class="mgdoc-item" @click="go('MgApiDoc')">接口文档</div>
      <div class="mgdoc-item">项目文档</div>
      <div class="mgdoc-item">项目模板</div>
      <div class="mgdoc-item">项目监测</div>
      <div class="mgdoc-item">项目工具</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.mgdoc-home {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .mgdoc-item {
    width: 200px;
    height: 40px;
    box-shadow: 0 0 6px rgb(211, 211, 211);
    border-radius: 6px;
    margin: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: box-shadow 0.4s ease;
    &:hover {
      box-shadow: 0 0 8px rgb(172, 161, 199);
    }
  }
}
</style>
<script>
export default {
  name: 'Home',
  data() {
    return {};
  },
  methods: {
    go(pname) {
      this.$router.push({
        name: pname
      });
    }
  }
};
</script>

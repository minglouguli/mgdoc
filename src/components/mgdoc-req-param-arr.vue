<template>
  <div class="mss-mgdoc-req-param-arr">
    <div v-if="arrDes.code">
      {{ arrDes.code }}:<span class="mss-brace">[</span>
    </div>
    <div v-else class="mss-brace">[</div>
    <div class="mss-index-block" v-if="arrDes.items">
      <mgdoc-req-param-obj
        v-if="arrDes.items.type == 'object'"
        :showCode="false"
        :objDes="arrDes.items"
      ></mgdoc-req-param-obj>
      <div v-else>
        <mgdoc-req-param-value :prop="arrDes.items"></mgdoc-req-param-value>
      </div>
    </div>
    <div class="mss-brace">]</div>
  </div>
</template>
<style lang="scss" scoped>
.mss-mgdoc-req-param-arr {
  font-size: 0.8rem;
}
.mss-brace {
  color: red;
}
.mss-index-block {
  padding-left: 2rem;
}
</style>
<script>
export default {
  name: 'mgdoc-req-param-arr',
  props: {
    arrDes: {
      type: Object
    }
  },
  data() {
    return {};
  }
};
</script>

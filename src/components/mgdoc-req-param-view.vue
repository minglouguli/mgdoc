<template>
  <div class="mgdoc-req-param-view" v-if="value">
    <div v-for="param in value" :key="param.code">
      <mgdoc-req-param-arr v-if="param.type == 'array'" :arrDes="param">
      </mgdoc-req-param-arr>

      <mgdoc-req-param-obj
        v-else-if="param.type == 'object'"
        :objDes="param"
      ></mgdoc-req-param-obj>

      <mgdoc-req-param-prop v-else :prop="param"></mgdoc-req-param-prop>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.mgdoc-req-param-view {
  background-color: #fcfcfc;
  padding: 0.5rem;
  border-radius: 6px;
}
</style>
<script>
export default {
  name: 'mgdoc-req-param-view',
  model: {
    prop: 'value',
    event: 'vchange'
  },
  props: {
    value: {
      type: [Array, String]
    }
  },
  data() {
    return {};
  },
  watch: {
    // value(v) {
    //   this.value = v;
    // }
  }
};
</script>

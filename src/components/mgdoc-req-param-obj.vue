<template>
  <div class="mss-mgdoc-req-param-obj">
    <div v-if="showCode && objDes.code">
      {{ objDes.code }}:<span class="mss-brace">{</span>
    </div>
    <div v-else class="mss-brace">{</div>
    <div class="mss-index-block" v-if="objDes.properties">
      <div v-for="prop in objDes.properties" :key="prop.code">
        <mgdoc-req-param-arr v-if="prop.type == 'array'" :arrDes="prop">
        </mgdoc-req-param-arr>
        <mgdoc-req-param-obj v-else-if="prop.type == 'object'" :objDes="prop">
        </mgdoc-req-param-obj>
        <div v-else>
          <mgdoc-req-param-prop :prop="prop"></mgdoc-req-param-prop>
        </div>
      </div>
    </div>
    <div class="mss-index-block" v-else>
      <span class="mss-mgdoc-fullname">{{ objDes.fullName }}</span>
    </div>

    <div class="mss-brace">}</div>
  </div>
</template>
<style lang="scss" scoped>
.mss-mgdoc-req-param-obj {
  font-size: 0.8rem;
}
.mss-index-block {
  padding-left: 2rem;
}
.mss-brace {
  color: #5a84dd;
}
.mss-mgdoc-fullname {
  font-size: 0.8rem;
  color: gray;
}
</style>
<script>
export default {
  name: 'mgdoc-req-param-obj',
  props: {
    showCode: {
      type: Boolean,
      default: true
    },
    objDes: {
      type: Object
    }
  },
  data() {
    return {};
  }
};
</script>

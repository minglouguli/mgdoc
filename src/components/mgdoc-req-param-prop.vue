<template>
  <div class="mgdoc-req-param-prop">
    <div class="mgdoc-req-param-prop-code">{{ prop.code }}</div>
    <div class="mgdoc-req-param-prop-value">
      :
      <input
        class="mss-input"
        :class="
          prop.defaultValue === null || prop.defaultValue === ''
            ? ''
            : 'mss-hasvalue-placeholder'
        "
        type="text"
        v-model="prop.c_defaultValue"
        :title="
          prop.c_defaultValue ||
          (prop.defaultValue === null || prop.defaultValue === ''
            ? '默认值'
            : prop.defaultValue)
        "
        :placeholder="
          prop.defaultValue === null || prop.defaultValue === ''
            ? '默认值'
            : prop.defaultValue === false
            ? 'false'
            : prop.defaultValue
        "
      />
    </div>
    <div
      class="mgdoc-req-param-prop-des"
      :title="prop.c_description || prop.description"
    >
      //
      <input
        class="mss-input"
        type="text"
        v-model="prop.c_description"
        :placeholder="prop.description"
      />
    </div>
    <div class="mgdoc-req-param-prop-type">类型：{{ prop.type }}</div>
  </div>
</template>

<style lang="scss" scoped>
.mgdoc-req-param-prop {
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  margin: 0.1rem 0rem;
  .mgdoc-req-param-prop-code {
    flex: 0 0 100px;
    color: #b36b08;
  }
  .mgdoc-req-param-prop-value {
    display: flex;
    align-items: center;
    flex: 0 0 160px;
    .mss-input {
      color: #735aa0;
      width: 100%;
      background-color: #fcfcfc;
      &::placeholder {
        color: #d6d6d6;
      }
    }
    .mss-hasvalue-placeholder {
      &::placeholder {
        color: #735aa0;
      }
    }
  }
  .mgdoc-req-param-prop-des {
    color: green;
    min-width: 200px;
  }
  .mss-input {
    border: none;
    outline: none;
    font-size: 0.8rem;
    padding: 2px 4px;
    border-radius: 4px;
    color: green;
    background-color: #fcfcfc;
    &::placeholder {
      color: green;
    }
    &:focus {
      background-color: rgb(236, 236, 236);
    }
  }
  .mgdoc-req-param-prop-type {
    color: gray;
    font-size: 0.8rem;
    display: inline-block;
    white-space: nowrap;
  }
}
</style>
<script>
export default {
  name: 'mgdoc-req-param-prop',
  props: {
    prop: {
      type: Object
    }
  },
  data() {
    return {};
  }
};
</script>

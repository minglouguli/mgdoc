<template>
  <div></div>
  <!-- <div
    class="ms-vs-input vs-input-parent vs-input-parent--state-null vs-input-content--has-label vs-component--primary vs-component--is-color"
  >
    <div
      class="vs-input-content vs-input-content--has-color vs-input-content--custome"
    >
      <textarea
        :rows="rows"
        :placeholder="label"
        :value="value"
        @change="changeValue"
        class="vs-input"
      ></textarea>
      <label
        for="vs-input--6"
        class="vs-input__label vs-input__label--label vs-input__label--custome"
        >{{ label }}</label
      >
    
    </div>
  </div> -->
</template>

<style lang="scss" scoped>
.vs-input-content--custome {
  display: flex;
  flex-direction: column-reverse;

  width: 100%;
  align-items: flex-start;
}
.vs-input__label--custome {
  position: relative;
  box-sizing: border-box;
  outline: none;
  list-style: none;
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  font-size: 0.75rem;
  transform: none;
}
// .vs-input-content--has-color .vs-input:focus + .vs-input__label--custome {
//   color: rgba(var(--vs-color), 1);
// }
</style>
<script>
export default {
  name: 'vs-textarea',
  model: {
    prop: 'value',
    event: 'vchange'
  },
  props: {
    labelPlaceholder: {
      type: String
    },
    label: {
      type: String
    },
    rows: {
      type: Number,
      default() {
        return 4;
      }
    },
    value: {}
  },
  data() {
    return {};
  },
  methods: {
    changeValue(e) {
      this.$emit('vchange', e.target.value);
      this.$emit('change', e.target.value);
    }
  }
};
</script>

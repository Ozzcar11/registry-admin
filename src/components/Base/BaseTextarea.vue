<template>
  <textarea
    class="textarea"
    :value="modelValue"
    @input="onInput($event)"
  />
</template>

<script>
export default {
  name: 'BaseTextarea',
  props: {
    modelValue: {
      type: [Number, String],
      default: ''
    }
  },
  emits: {
    'update:modelValue': null
  },
  methods: {
    onInput (event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.textarea {
  background: #F0F4F9;
  border: none;
  outline: none;
  resize: none;
  padding: 10px;
  height: 100px;
  font: inherit;
  font-size: 14px;
}
</style>

<template>
  <div class="info">
    <p class="title">
      {{ label }}
    </p>
    <InputStatic>
      {{ value }}
    </InputStatic>
  </div>
</template>

<script>
import InputStatic from '@/components/InputStatic'

export default {
  name: 'AppInfo',
  components: {
    InputStatic
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.info {
  .title {
    margin-bottom: 16px;
    font-size: 18px;
    font-weight: 600;
  }
}
</style>

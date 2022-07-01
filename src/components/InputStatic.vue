<template>
  <div class="input">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'InputStatic'
}
</script>

<style lang="scss" scoped>
.input {
  background: #F0F4F9;
  border-radius: 5px;
  padding: 14px 20px;
  min-height: 50px;
  font-size: 16px;
  color: #5C6170;
}
</style>

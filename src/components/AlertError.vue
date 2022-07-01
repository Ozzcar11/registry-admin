<template>
  <div class="alert">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'AlertError'
}
</script>

<style lang="scss" scoped>
.alert {
  padding: 14px 20px;
  background: rgba(255, 0, 0, 0.29);
  font-weight: 500;
  line-height: 1.3;
}
</style>

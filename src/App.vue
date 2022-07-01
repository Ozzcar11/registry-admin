<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>

<script>
import DefaultLayout from './layouts/default'
import EmptyLayout from './layouts/empty'

export default {
  name: 'App',
  components: {
    DefaultLayout,
    EmptyLayout
  },
  computed: {
    layout () {
      const layout = this.$route.meta.layout || 'EmptyLayout'
      return layout
    }
  }
}
</script>

<style lang="scss">
.spinner:before {
  content: '';
  margin-left: -15px;
  margin-top: -15px;
  box-sizing: border-box;
  position: absolute;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  border: 3px solid #fff;
  border-top-color: transparent;
  animation: spinner 0.7s linear infinite;
}

@keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}
</style>

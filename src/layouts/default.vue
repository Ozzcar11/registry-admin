<template>
  <div class="default-layout">
    <AppSidebar
      :links="links"
      class="default-layout__sidebar"
    />

    <div class="default-layout__content">
      <div class="container">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import AppSidebar from '@/components/AppSidebar'

export default {
  name: 'LayoutDefault',
  components: {
    AppSidebar
  },
  data () {
    return {
      links: [
        { image: '/images/persons.svg', text: 'Заявки на регистрацию', href: '/' },
        { image: '/images/persons.svg', text: 'Предприятия', href: '/accepted' }
      ]
    }
  }
}
</script>

<style lang="scss">
.default-layout {
  height: 100vh;
  width: 100%;
  overflow: hidden;
  display: flex;

  &__sidebar {
    flex-shrink: 0;
    width: 300px;
    height: 100%;
  }

  &__content {
    padding: 40px;
    flex-grow: 1;
    flex-shrink: 0;
    overflow: auto;
  }
}
</style>

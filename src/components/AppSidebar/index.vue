<template>
  <div class="sidebar">
    <div class="sidebar__logo-wrapper">
      <a href="/" class="logo">
        <img
          src="/images/logo.png"
          alt="Логотип"
          class="logo__image"
        >
        <p class="logo__title">
          ПОРТАЛ<br>КООПЕРАЦИИ
        </p>
      </a>
    </div>

    <div class="sidebar__links">
      <SidebarItem
        v-for="(link, index) of links"
        :key="index"
        :href="link.href"
        :image="link.image"
        :text="link.text"
      />
    </div>
  </div>
</template>

<script>
import SidebarItem from '@/components/AppSidebar/SidebarItem'
export default {
  name: 'AppSidebar',
  components: {
    SidebarItem
  },
  props: {
    links: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  background: #fff;
  padding: 30px;

  &__logo-wrapper {
    .logo {
      display: flex;
      align-items: center;
      color: #000;
      text-decoration: none;
      &__image {
        display: block;
        width: 52px;
      }
      &__title {
        font-weight: bold;
        font-size: 16px;
        line-height: 1.45;
        margin-left: 10px;
      }
    }
  }

  &__links {
    margin-top: 80px;
  }
}
</style>

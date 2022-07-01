<template>
  <a :href="href" class="sidebar-item">
    <div class="image-wrapper">
      <img :src="image" class="image">
    </div>
    <p class="text">{{ text }}</p>
  </a>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    href: {
      type: String,
      default: null
    },
    image: {
      type: String,
      default: null
    },
    text: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar-item {
  display: flex;
  text-decoration: none;
  align-items: center;

  &:hover .text {
    text-decoration: underline;
  }

  .image-wrapper {
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;

    .image {
      display: block;
      max-width: 100%;
      max-height: 100%;
    }
  }

  .text {
    margin-left: 20px;
    font-weight: 600;
    font-size: 16px;
    color: #1355FF;
  }
}
</style>

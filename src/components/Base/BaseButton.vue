<template>
  <component
      :is="computedTag"
      :href="href"
      class="button"
      :class="classes"
      @click="$emit('click', $event)"
  >
    <slot />
  </component>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    href: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    theme: {
      type: String,
      default: 'main',
      validator: val => ['main', 'success', 'danger', 'naked', 'grey'].includes(val)
    },
    pill: {
      type: Boolean,
      default: false
    },
    square: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'md'
    },
    block: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    'click'
  ],
  computed: {
    computedTag () {
      if (this.href) {
        return 'a'
      }
      return 'button'
    },
    classes () {
      return [
        `button-${this.theme}`,
        `button-size-${this.size}`,
        { 'button-square': this.square },
        { 'button-pill': this.pill },
        { 'button-block': this.block }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
$input-md-size                            : 45px !default;
$input-lg-size                            : 55px !default;
$input-elg-size                           : 65px !default;

.button {
  border: none;
  font-weight: 500;
  font-size: 14px;
  padding: 0 32px;
  transition: .2s;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  border-radius: 4px;

  &-main {
    background: #1355FF;
    color: #fff;

    &:hover {
      background: #6891ff;
    }
  }

  &-success {
    background: #139D10;
    color: #fff;

    &:hover {
      background: #5bb958;
    }
  }

  &-danger {
    background: #D01717;
    color: #fff;

    &:hover {
      background: #c93f3f;
    }
  }

  &-grey {
    background: #C7D0EA;
    color: #000;

    &:hover {
      background: rgba(199, 208, 234, 0.7);
    }
  }

  &-naked {
    background: transparent;
  }

  /* BORDER */
  &-square {
    border-radius: 0;
  }

  &-pill {
    border-radius: 1000px;
  }
  /* BORDER */

  &-block {
    width: 100%;
  }

  /* SIZE */
  &-size {
    &-md {
      height: $input-md-size;
    }
    &-lg {
      height: $input-lg-size;
    }
    &-elg {
      height: $input-elg-size;
      font-size: 16px;
    }
  }
  /* SIZE */
}
</style>

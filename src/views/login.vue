<template>
  <div class="login">
    <div class="login__content">
      <form @submit.prevent="onLogin">
        <BaseInput
          v-model="form.username"
          placeholder="Логин"
          class="login__input"
        />
        <BaseInput
          v-model="form.password"
          placeholder="Пароль"
          class="login__input"
        />
        <BaseButton block>
          <span v-if="flag" class="spinner"></span>
          <template v-else>Войти</template>
        </BaseButton>
        <br>
        <br>
        <BaseError v-if="notAuth">Неверный логин или пароль</BaseError>
      </form>
    </div>
  </div>
</template>

<script>
import BaseInput from '@/components/Base/BaseInput'
import BaseButton from '@/components/Base/BaseButton'
import BaseError from '@/components/Base/BaseError'

export default {
  name: 'PageLogin',
  components: {
    BaseButton,
    BaseInput,
    BaseError
  },
  data () {
    return {
      form: {
        username: 'admin',
        password: 'admin'
      },
      notAuth: false,
      flag: false
    }
  },
  methods: {
    async onLogin () {
      this.flag = true
      try {
        await this.$store.dispatch('auth/logIn', this.form)
      } catch (e) {
        console.log(e)
        if (e.request.status === 401) {
          this.notAuth = true
        }
        this.flag = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  &__content {
    padding: 30px;
    background: #fff;
    width: 600px;
  }

  &__input {
    margin-bottom: 20px;
  }
}
</style>

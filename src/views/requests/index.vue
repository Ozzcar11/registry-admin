<template>
  <main class="home">
    <section class="requests">
      <h3>Заявки на регистрацию</h3>

      <BaseButton
        href="/rejected"
        class="requests__btn"
      >
        Отклоненные заявки
      </BaseButton>

      <AppTable
        :fields="fields"
        :items="tableData"
        class="requests__table"
      >
        <template #statement="{ id }">
          <a :href="'/requests/' + id">Открыть</a>
        </template>
      </AppTable>
    </section>
  </main>
</template>

<script>
import BaseButton from '@/components/Base/BaseButton'
import AppTable from '@/components/AppTable'

export default {
  name: 'PageHome',
  components: {
    AppTable,
    BaseButton
  },
  data () {
    return {
      fields: [
        { key: 'number', label: 'Номер заявки' },
        { key: 'company', label: 'Предприятие' },
        { key: 'statement', label: 'Заявление', slot: true },
        { key: 'phone', label: 'Телефон для связи' },
        { key: 'status', label: 'Статус' }
      ],
      tableData: []
    }
  },
  async created () {
    await this.fetchRequests()
  },
  methods: {
    async fetchRequests () {
      try {
        const res = await this.$api.requests.list()
        const apps = res.data ?? []
        this.tableData = apps.map(item => ({
          id: item.id,
          number: item.id,
          company: item.name,
          phone: item.telephone,
          status: 'Не рассмотрено'
        }))
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  .requests {
    &__btn {
      margin-top: 60px;
    }
    &__table {
      margin-top: 36px;
    }
  }
}
</style>

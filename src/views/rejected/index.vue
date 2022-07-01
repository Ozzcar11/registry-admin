<template>
  <main class="rejected">
    <section class="requests">
      <h3>Отклоненные заявки</h3>

      <BaseButton
        href="/"
        class="requests__btn"
      >
        Все заявки
      </BaseButton>

      <AppTable
        :fields="fields"
        :items="tableData"
        class="requests__table"
      >
        <template #statement="{ id }">
          <a :href="'/rejected/' + id">Открыть</a>
        </template>
      </AppTable>
    </section>
  </main>
</template>

<script>
import BaseButton from '@/components/Base/BaseButton'
import AppTable from '@/components/AppTable'

export default {
  name: 'PageRejected',
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
        { key: 'status', label: 'Статус' },
        { key: 'reason', label: 'Причина отказа' }
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
        const res = await this.$api.requests.rejectedList()
        const data = res.data ?? []

        this.tableData = data.map(item => ({
          id: item.id,
          number: item.id,
          company: item.name,
          phone: item.telephone,
          status: 'Отклонено',
          reason: item.rejection_cause
        }))
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.rejected {
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

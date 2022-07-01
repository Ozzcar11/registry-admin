<template>
  <main class="accepted">
    <h3>Предприятия</h3>

    <AppTable
      :fields="fields"
      :items="tableData"
      class="accepted__table"
    >
      <template #statement="{ id }">
        <a :href="'/accepted/' + id">Открыть</a>
      </template>
    </AppTable>
  </main>
</template>

<script>
import AppTable from '@/components/AppTable'

export default {
  name: 'PageAccepted',
  components: {
    AppTable
  },
  data () {
    return {
      fields: [
        { key: 'number', label: 'Номер заявки' },
        { key: 'company', label: 'Предприятие' },
        { key: 'statement', label: 'Заявление', slot: true },
        { key: 'phone', label: 'Телефон для связи' }
      ],
      tableData: []
    }
  },
  async created () {
    await this.fetchCompanies()
  },
  methods: {
    async fetchCompanies () {
      try {
        const res = await this.$api.requests.acceptedList()
        const data = res.data ?? []

        this.tableData = data.map(item => ({
          id: item.id,
          number: item.id,
          company: item.name,
          phone: item.telephone,
          status: item.status,
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
.accepted {
  &__table {
    margin-top: 36px;
  }
}
</style>

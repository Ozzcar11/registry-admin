<template>
  <table class="table">
    <thead class="header">
      <tr class="row">
        <th v-for="field of fields" :key="field.key" class="cell">
          <div class="content">
            <span>
              {{ field.label }}
            </span>
          </div>
        </th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(item, index) of items" :key="index">
        <td v-for="(field, index) of fields" :key="index">
          <slot v-if="field.slot" :name="field.key" v-bind="item" />
          <template v-else>
            {{ item[field.key] }}
          </template>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'AppTable',
  props: {
    fields: {
      type: Array,
      default: () => []
    },
    items: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
table {
  border-collapse: collapse;
  width: 100%;

  .header {
    background: #eaeaea;

    .row {
      .cell {
        text-align: left;
        font-weight: 600;
      }
    }
  }
  tr {
    td,
    th {
      padding: 14px 22px;
      font-size: 14px;
    }
  }
}
</style>

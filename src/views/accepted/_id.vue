<template>
  <main class="company">
    <section>
      <h3>№{{ requestData.id }} {{ requestData.companyName }}</h3>

      <div class="company-info">
        <div class="company-container">
          <div class="company-avatar">
            <img
              v-if="requestData.imageOrganization"
              :src="$options.MAIN_URL + requestData.imageOrganization"
            />
            <div class="company-avatar__text" v-else>Фото отсутствует</div>
          </div>
          <h3>Основные данные о предприятии</h3>
        </div>
        <div class="company-info__grid">
          <AppInfo
            v-for="(item, index) of baseDataOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
            class="info-block"
          />
          <div>
            <BaseCheckbox
              disabled
              :modelValue="requestData.isMilitaryIndustrial"
              label="Является предприятияем оборонно-промышленного комплекса"
            />
            <BaseCheckbox
              disabled
              :modelValue="requestData.isBackbone"
              label="Системообразующее"
            />
          </div>
        </div>

        <h3 class="company-info__title2">Контактная информация предприятия</h3>
        <div class="company-info__grid" style="margin-bottom: 40px">
          <AppInfo
            v-for="(item, index) of contactDataOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
            class="info-block"
          />
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import AppInfo from '@/components/AppInfo'
import BaseCheckbox from '@/components/Base/BaseCheckbox'

export default {
  name: 'PageCompany',
  components: {
    AppInfo,
    BaseCheckbox
  },
  MAIN_URL: 'http://10.11.58.67:8003/media/',
  data() {
    return {
      requestData: {
        id: '',
        isRejected: false,
        reason: '',
        organizationalLegalForm: '',
        companyName: '',
        address: '',
        inn: '',
        municipality: '',
        industry: '',
        kindOfActivity: '',
        totalEmployees: '',
        isMilitaryIndustrial: false,
        isBackbone: false,
        fio: '',
        number: '',
        email: '',
        login: '',
        imageOrganization: ''
      },
      newRejectReason: ''
    }
  },
  computed: {
    baseDataOptions() {
      const {
        organizationalLegalForm,
        companyName,
        address,
        inn,
        municipality,
        industry,
        kindOfActivity,
        totalEmployees
      } = this.requestData

      return [
        {
          label: 'Организационно-правовая форма',
          value: organizationalLegalForm
        },
        { label: 'Название предприятия', value: companyName },
        { label: 'Адрес', value: address },
        { label: 'ИНН ', value: inn },
        { label: 'Муниципальное образование', value: municipality },
        { label: 'Отрасль', value: industry },
        { label: 'Вид деятельности', value: kindOfActivity },
        { label: 'Общая численность сотрудников', value: totalEmployees }
      ]
    },
    contactDataOptions() {
      const { fio, number, email, login } = this.requestData

      return [
        { label: 'ФИО ответственного', value: fio },
        { label: 'Телефон', value: number },
        { label: 'E-mail', value: email },
        { label: 'Логин', value: login }
      ]
    }
  },
  async created() {
    await this.fetchInfo()
  },
  methods: {
    async fetchInfo() {
      const res = await this.$api.requests.acceptedCompany(
        this.$route.params.id
      )
      const data = res.data

      this.requestData.id = data.id
      this.requestData.organizationalLegalForm = data.organization_form
      this.requestData.companyName = data.name
      this.requestData.address = data.address
      this.requestData.inn = data.INN
      this.requestData.municipality = data.municipal
      this.requestData.industry = data.industry
      this.requestData.kindOfActivity = data.activities[0]
      this.requestData.totalEmployees = data.employees
      this.requestData.isMilitaryIndustrial = data.is_military_industrial
      this.requestData.isBackbone = data.is_backbone
      this.requestData.fio = data.responsible
      this.requestData.number = data.telephone
      this.requestData.email = data.email
      this.requestData.login = data.login
      this.requestData.isRejected = data.is_rejected
      this.requestData.reason = data.rejection_cause
      this.requestData.imageOrganization = data.image_organization
    }
  }
}
</script>

<style lang="scss" scoped>
.company {
  &-container {
    display: flex;
    align-items: center;
    h3 {
      margin-left: 30px;
    }
  }
  &-avatar {
    position: relative;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: rgb(245, 245, 245);
    overflow: hidden;
    &__text {
      text-align: center;
      padding-top: 27px;
    }
    img {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &-info {
    margin-top: 60px;
    padding: 40px;
    background: #fff;

    &__title2 {
      margin-top: 60px;
    }

    &__grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 50px;
      grid-row-gap: 30px;
      margin-top: 30px;
    }
  }
}
</style>

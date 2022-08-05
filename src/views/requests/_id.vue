<template>
  <main class="request">
    <section>
      <h3>№{{ requestData.id }} {{ requestData.companyName }}</h3>

      <div class="request-info">
        <div class="request-container">
          <h3>Основные данные о предприятии</h3>
          <div class="request-avatar">
            <img :src="$options.MAIN_URL + requestData.imageOrganization">
          </div>
        </div>
        <div class="request-info__grid">
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

        <h3 class="request-info__title2">
          Контактная информация предприятия
        </h3>
        <div
          class="request-info__grid"
          style="margin-bottom: 40px;"
        >
          <AppInfo
            v-for="(item, index) of contactDataOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
            class="info-block"
          />
        </div>

        <AlertError v-if="requestData.isRejected">
          {{ requestData.reason }}
        </AlertError>

        <div
          v-else
          class="panel"
        >
          <BaseButton
            square
            theme="success"
            @click="onConfirm"
          >
            Подтвердить
          </BaseButton>
          <BaseButton
            square
            theme="danger"
            class="panel__btn-rej"
            @click="$refs['reject-modal'].open()"
          >
            Отклонить
          </BaseButton>
        </div>
      </div>
    </section>

    <AppModal
      ref="reject-modal"
    >
      <div class="reject-modal">
        <p class="reject-modal__title">№855236 АО “Электросвязь”</p>
        <p class="reject-modal__subtitle">Введите причину отказа:</p>

        <form @submit.prevent="onReject">
          <BaseTextarea
            v-model="newRejectReason"
            placeholder="Комментарий.."
            class="reject-modal__textarea"
          />
          <div class="reject-modal__btn-wrapper">
            <BaseButton
              square
              theme="danger"
              class="reject-modal__btn"
            >
              Отклонить
            </BaseButton>
          </div>
        </form>
      </div>
    </AppModal>
  </main>
</template>

<script>
import BaseButton from '@/components/Base/BaseButton'
import AppInfo from '@/components/AppInfo'
import BaseCheckbox from '@/components/Base/BaseCheckbox'
import AlertError from '@/components/AlertError'
import AppModal from '@/components/AppModal'
import BaseTextarea from '@/components/Base/BaseTextarea'

export default {
  name: 'PageRequest',
  components: {
    BaseTextarea,
    AppModal,
    BaseButton,
    AlertError,
    BaseCheckbox,
    AppInfo
  },
  MAIN_URL: 'http://10.11.58.67:8003/media/',
  data () {
    return {
      requestData: {
        id: '',
        isRejected: false,
        reason: '',
        organizationalLegalForm: '',
        companyName: '',
        address: '',
        coordinates: '',
        inn: '',
        municipality: '',
        industry: '',
        kindOfActivity: '',
        listOfActivity: [],
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
    baseDataOptions () {
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
        { label: 'Организационно-правовая форма', value: organizationalLegalForm },
        { label: 'Название предприятия', value: companyName },
        { label: 'Адрес', value: address },
        { label: 'ИНН ', value: inn },
        { label: 'Муниципальное образование', value: municipality },
        { label: 'Отрасль', value: industry },
        { label: 'Вид деятельности', value: kindOfActivity },
        { label: 'Общая численность сотрудников', value: totalEmployees }
      ]
    },
    contactDataOptions () {
      const {
        fio,
        number,
        email,
        login
      } = this.requestData

      return [
        { label: 'ФИО ответственного', value: fio },
        { label: 'Телефон', value: number },
        { label: 'E-mail', value: email },
        { label: 'Логин', value: login }
      ]
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    async fetchData () {
      const res = await this.$api.requests.one(this.$route.params.id)
      const data = res.data
      this.requestData.id = data.id
      this.requestData.organizationalLegalForm = data.organization_form
      this.requestData.companyName = data.name
      this.requestData.address = data.address
      this.requestData.coordinates = data.coordinates
      this.requestData.inn = data.INN
      this.requestData.municipality = data.municipal
      this.requestData.industry = data.industry
      this.requestData.kindOfActivity = data.activities[0]
      this.requestData.listOfActivity = data.activities_id
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
    },
    async onConfirm () {
      try {
        await this.$api.requests.confirm(this.$route.params.id)
        this.$router.push('/')
      } catch (e) {
        console.log(e)
      }
    },
    async onReject () {
      try {
        await this.$api.requests.reject(this.$route.params.id, this.newRejectReason)
        this.$router.push('/')
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.request {
  &-container {
    display: flex;
    justify-content: space-between;
  }
  &-info {
    margin-top: 60px;
    padding: 40px;
    background: #fff;

    h3 {
      margin-bottom: 30px;
    }

    &__title2 {
      margin-top: 60px;
    }

    &__grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 50px;
      grid-row-gap: 30px;
    }
  }

  .panel {
    &__btn-rej {
      margin-left: 30px;
    }
  }
}

.reject-modal {
  width: 900px;

  &__title {
    font-weight: 600;
    font-size: 30px;
    text-align: center;
  }
  &__subtitle {
    font-weight: 500;
    font-size: 30px;
    text-align: center;
    margin-top: 57px;
    margin-bottom: 28px;
  }
  &__textarea {
    padding: 16px;
    height: 170px;
    width: 650px;
    display: block;
    margin: 0 auto;
  }
  &__btn-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 60px;
  }
  &__btn {
  }
}
</style>

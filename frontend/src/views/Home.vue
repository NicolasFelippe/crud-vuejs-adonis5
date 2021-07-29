<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col">
        <button
          type="button"
          class="btn btn-primary"
          @click="add"
        >
          Adicionar
        </button>
      </div>
      <div class="col-3">
        <form id="search">
          Procurar <input
            v-model="searchQuery"
            name="query"
          >
        </form>
      </div>
      <FormPatient ref="formPatient" />
    </div>
    <div class="row">
      <Table
        :columns="gridColumns"
        :filter-key="searchQuery"
        :service="serviceRequest()"
        @edit="edit"
        @remove="remove"
      />
    </div>
  </div>
</template>

<script>
import Table from '@/components/Table'
import FormPatient from '@/components/form/FormPatient'
import patientService from '../services/patient-service'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Home',
  components: {
    Table,
    FormPatient
  },
  data () {
    return {
      isModalVisible: false,
      searchQuery: '',
      pagination: null,
      gridColumns: [
        {
          id: 'name',
          translate: 'Nome'
        },
        {
          id: 'age',
          translate: 'Idade'
        },
        {
          id: 'test',
          translate: 'Teste Covid',
          format: (value) => value ? 'Positivo' : 'Negativo'
        },
        {
          id: 'action',
          translate: 'Ações'
        }
      ]
    }
  },
  computed: {
    ...mapGetters('patient', ['patients'])
  },
  // async beforeMount () {
  //   try {
  //     const { data, meta } = await patientService.getAll()
  //     this.pagination = meta
  //     this.updateAll(data)
  //   } catch (error) {
  //     alert('Erro ao buscar pacientes')
  //   }
  // },
  methods: {
    ...mapActions('patient', ['updateAll', 'removePatient', 'updatePatient']),
    serviceRequest () {
      return patientService.getAll
    },
    add () {
      this.$refs.formPatient.showModal()
    },
    async edit (value) {
      this.$refs.formPatient.patient = { ...value }
      this.$refs.formPatient.edit = true
      this.$refs.formPatient.showModal()
    },
    async remove (value) {
      try {
        await patientService.remove(value.id)
        this.removePatient(value.id)
      } catch (error) {
        alert('Erro ao deletar paciente')
      }
    }
  }
}
</script>

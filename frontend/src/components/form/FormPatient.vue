<template>
  <Dialog
    v-show="isModalVisible"
    @close="closeModal"
  >
    <template v-slot:header>
      Valores
    </template>

    <template v-slot:body>
      <form>
        <CustomInput
          v-model="patient.name"
          label="Nome"
          required
          :rule="ruleEmpty"
          @invalid="(val) => invalidForm=val"
        />
        <CustomInput
          v-model="patient.age"
          label="Idade"
          type="number"
          required
          :rule="ruleNumber"
          @invalid="(val) => invalidForm=val"
        />
        <CustomInput
          v-model="patient.test"
          label="Positivo"
          type="radio"
          :radio-value="true"
          name-input="test"
          @invalid="(val) => invalidForm=val"
        />
        <CustomInput
          v-model="patient.test"
          label="Negativo"
          type="radio"
          :radio-value="false"
          name-input="test"
          @invalid="(val) => invalidForm=val"
        />
        {{ patient }}
      </form>
    </template>
    <template v-slot:footer>
      <button
        type="button"
        class="btn btn-primary"
        :disabled="invalidForm"
        @click="edit ? update() : save()"
      >
        Salvar
      </button>
    </template>
  </Dialog>
</template>

<script>
import Dialog from '../dialog/Dialog'
import CustomInput from '../input/CustomInput'
import patientService from '../../services/patient-service'
import { mapActions } from 'vuex'
export default {
  name: 'FormPatient',
  components: {
    Dialog,
    CustomInput
  },
  data () {
    return {
      isModalVisible: false,
      invalidForm: true,
      edit: false,
      patient: {
        name: '',
        age: 0,
        test: false
      }
    }
  },
  methods: {
    ...mapActions('patient', ['addPatient', 'updatePatient']),
    ruleNumber (value) {
      if (value <= 0) {
        return 'A idade deve ser maior que 0'
      }
      if (value > 120) {
        return 'A idade deve ser menor que 120'
      }
      return ''
    },
    ruleEmpty (value) {
      if (!value || value.length <= 0) {
        return 'Campo obrigatório'
      }
      return ''
    },
    async save () {
      try {
        const patient = await patientService.save(this.patient)
        this.addPatient(patient)
        this.closeModal()
        alert('sucesso')
      } catch (error) {
        alert('erro')
      }
    },
    async update () {
      try {
        const patient = await patientService.update(this.patient)
        this.updatePatient(patient)
        this.closeModal()
        alert('sucesso')
      } catch (error) {
        alert('erro')
      }
    },
    showModal () {
      this.isModalVisible = true
    },
    closeModal () {
      this.isModalVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>


<template>
  <div :class="{ 'mb-3': !isRadio, 'form-check': isRadio }">
    <label
      :for="label"
      :class="{ 'form-label': !isRadio, 'form-check-label': isRadio }"
    >{{ label }}</label>
    <input
      :id="label"
      :type="type"
      :name="nameInput"
      :class="{ 'form-control': !isRadio, 'form-check-input': isRadio }"
      :value="isRadio ? radioValue : value"
      :required="required"
      :checked="radioValue === value"
      @input="onInput"
      @change="onChange"
      @blur="onBlur"
    >
    <div
      v-if="required && error"
      class="error"
    >
      {{ error }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomInput',
  props: {
    label: {
      type: String,
      required: true
    },
    radioValue: {
      type: [String, Boolean, Number],
      default: null
    },
    nameInput: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number, Boolean],
      required: true
    },
    type: {
      type: String,
      default: 'text'
    },
    required: {
      type: Boolean,
      default: false
    },
    rule: {
      type: [Function],
      default: () => {}
    }
  },
  data () {
    return {
      error: false
    }
  },
  computed: {
    isRadio () {
      return this.type.toLowerCase() === 'radio'
    },
    name () {
      return this.label.toLowerCase()
    }
  },
  watch: {
    value: {
      handler (value) {
        this.validateInput(value)
      }
    }
  },
  methods: {
    onInput (event) {
      let value = this.formatValue(event.target.value)
      if (this.type === 'number') {
        value = Number(value)
      }
      this.$emit('input', value)
    },
    formatValue (value) {
      if (this.type === 'number' || typeof this.radioValue === 'number') {
        value = Number(value)
      }
      if (typeof this.radioValue === 'boolean') {
        value = Boolean(value)
      }
      return value
    },
    validateInput (value) {
      this.error = this.rule(value)
      this.$emit('invalid', Boolean(this.error))
    },
    onBlur (event) {
      this.validateInput(event.target.value)
    },
    onChange (event) {
      const value = this.formatValue(event.target.value)
      this.$emit('change', value)
    }
  }
}
</script>

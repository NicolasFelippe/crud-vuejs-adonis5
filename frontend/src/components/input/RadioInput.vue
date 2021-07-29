
<template>
  <div class="mb-3">
    <label
      :for="name"
      class="form-label"
    >{{ label }}</label>
    <input
      :id="name"
      type="radio"
      :name="name"
      class="form-control"
      :value="value"
      @input="onInput"
      @change="onChange"
      @blur="onBlur"
    >
    <div class="form-check">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
  <label class="form-check-label" for="flexRadioDefault1">
    Default radio
  </label>
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
    value: {
      type: [String, Number],
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
      if (this.type === 'number') {
        value = Number(value)
      }
      return value
    },
    validateInput (value) {
      this.error = this.rule(value)
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

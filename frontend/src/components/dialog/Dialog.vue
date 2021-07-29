<template>
  <transition name="dialog-fade">
    <div class="dialog-backdrop">
      <div
        class="dialog"
        role="dialog"
        aria-labelledby="dialogTitle"
        aria-describedby="dialogDescription"
        :style="styleD"
      >
        <header
          id="dialogTitle"
          class="dialog-header"
        >
          <slot name="header">
            default title
          </slot>
          <div
            class="btn-close"
            aria-label="Close dialog"
            @click="close"
          >
            x
          </div>
        </header>

        <section
          id="dialogDescription"
          class="dialog-body"
        >
          <slot name="body">
            default body
          </slot>
        </section>

        <footer class="dialog-footer">
          <slot name="footer" />
          <button
            type="button"
            class="btn btn-light"
            aria-label="Close dialog"
            @click="close"
          >
            Fechar
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    styleD: {
      type: String,
      default: 'width: 80%;'
    }
  },
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1060;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  outline: 0;
}

.dialog {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}

.dialog-header,
.dialog-footer {
  padding: 15px;
  display: flex;
}

.dialog-header {
  position: relative;
  border-bottom: 1px solid #eeeeee;
  color: #000;
  justify-content: space-between;
}

.dialog-footer {
  border-top: 1px solid #eeeeee;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: flex-end;
  align-items: center;
}

.dialog-body {
  position: relative;
  padding: 20px 10px;
}

.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: #000;
  background: transparent;
}
.btn {
  margin-left: 15px;
}
.dialog-fade-enter,
.dialog-fade-leave-to {
  opacity: 0;
}

.dialog-fade-enter-active,
.dialog-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>

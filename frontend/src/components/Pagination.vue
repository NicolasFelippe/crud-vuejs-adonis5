<template>
  <nav
    aria-label="Page navigation"
    class="row"
  >
    <ul class="pagination">
      <li class="page-item">
        <div
          v-if="pagination.current_page !== 1"
          class="page-link btn"
          @click="$emit('fetchPagination', pagination.first_page_url)"
        >
          Primeira
        </div>
      </li>
      <li class="page-item">
        <div
          v-if="pagination.current_page !== 1"
          class="page-link btn"
          :href="pagination.previous_page_url"
          @click="$emit('fetchPagination', pagination.previous_page_url)"
        >
          Anterior
        </div>
      </li>
      <li class="page-item">
        <div
          v-if="pagination.last_page !== pagination.current_page"
          class="page-link btn"
          @click="$emit('fetchPagination', pagination.next_page_url)"
        >
          Próximo
        </div>
      </li>
      <li class="page-item">
        <div
          v-if="pagination.last_page !== pagination.current_page"
          class="page-link btn"
          @click="$emit('fetchPagination', pagination.last_page_url)"
        >
          Última
        </div>
      </li>
      <li class="ms-2">
        <div>
          Página {{ pagination.current_page }}/{{ pagination.last_page }} -
          Total Registros: {{ pagination.total }}
        </div>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    pagination: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

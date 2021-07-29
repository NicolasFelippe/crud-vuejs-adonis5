<template>
  <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th
          v-for="(key, x) in columns"
          :key="x"
          :class="{ active: sortKey == key }"
          @click="sortBy(key.id)"
        >
          {{ key.translate | capitalize }}
          <span
            class="arrow"
            :class="sortOrders[key] > 0 ? 'asc' : 'dsc'"
          />
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(entry, e) in filteredData"
        :key="e"
      >
        <td
          v-for="(key, k) in columns"
          :key="k"
        >
          <div v-if="key.id === 'action'">
            <button
              type="button"
              class="btn btn-warning me-3"
              @click="$emit('edit', entry)"
            >
              Editar
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="$emit('remove', entry)"
            >
              Deletar
            </button>
          </div>
          {{ getCell(entry, key) }}
        </td>
      </tr>
    </tbody>
    <tfoot>
      <Pagination
        :pagination="pagination"
        @fetchPagination="fetchPagination"
      />
    </tfoot>
  </table>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Pagination from './Pagination'
export default {
  name: 'Table',
  components: {
    Pagination
  },
  filters: {
    capitalize (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },
  props: {
    data: {
      type: Array,
      required: true
    },
    columns: {
      type: Array,
      required: true
    },
    filterKey: {
      type: String,
      default: ''
    },
    service: {
      type: Function,
      required: true
    }
  },
  data () {
    const sortOrders = {}
    this.columns.forEach((key) => {
      sortOrders[key.id] = 1
    })
    return {
      sortKey: '',
      sortOrders,
      pagination: {}
    }
  },
  computed: {
    ...mapGetters('patient', ['patients']),
    filteredData () {
      const sortKey = this.sortKey
      const filterKey = this.filterKey && this.filterKey.toLowerCase()
      const order = this.sortOrders[sortKey] || 1
      let data = this.data
      if (filterKey) {
        data = data.filter((row) => {
          return Object.keys(row).some((key) => {
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
          })
        })
      }
      if (sortKey) {
        data = data.slice().sort((a, b) => {
          a = a[sortKey]
          b = b[sortKey]
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
      }
      return data
    }
  },
  beforeMount () {
    this.fetchPagination()
  },
  methods: {
    ...mapActions('patient', ['updateAll']),
    async fetchPagination (value) {
      try {
        const { meta } = await this.service(value)
        this.pagination = meta
      } catch (error) {
        alert('Erro ao buscar paginação')
      }
    },
    getCell (entry, key) {
      if (typeof key.format === 'function') {
        return key.format(entry[key.id])
      }
      return entry[key.id]
    },
    sortBy (key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    }
  }
}
</script>

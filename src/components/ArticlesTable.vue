<template>
  <div>
    <div class="table-responsive table-box">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Author</th>
            <th scope="col">Tags</th>
            <th scope="col">Excerpt</th>
            <th scope="col">Created</th>
          </tr>
        </thead>
        <TableBody
          :isError="isError"
          :isPending="isPending || isLoading || isFetching || isRefetching"
          :data="data"
          :limit="limit"
          :page="page"
        />
      </table>
    </div>
    <PaginationComponents v-if="data" :articlesCount="data.data.articlesCount" />
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { getArticles } from '@/utils/getArticles'
// component
import TableBody from './TableBody.vue'
import PaginationComponents from './PaginationComponents.vue'
import { ref, watch } from 'vue'
import { useQuery, useQueryClient } from '@tanstack/vue-query'

const route = useRoute()

const queryClient = useQueryClient()

// in /articles it will query the page 1 and for /articles/page/:page query the :page
const limit = ref(route.query.limit ? +route.query.limit : 10)
const page = ref(route.params.page ? +route.params.page : 1)

watch(route, () => {
  page.value = route.params.page ? +route.params.page : 1
  limit.value = route.query.limit ? +route.query.limit : 10
  queryClient.invalidateQueries({ queryKey: ['articles'] })
})
const { data, isError, isPending, isLoading, isRefetching, isFetching } = useQuery({
  queryKey: ['articles'],
  queryFn: () => getArticles(page.value, limit.value)
})
</script>

<style scoped>
.table-box {
  min-height: calc(100vh - 300px);
}
thead tr {
  background-color: var(--silver);
}
</style>

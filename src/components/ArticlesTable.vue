<template>
  <div>
    <div class="py-4 d-flex align-items-center justify-content-between z-3" id="main-heading">
      <h1>All Posts</h1>
    </div>
    <div class="table-responsive">
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
          :isPending="isPending"
          :data="data"
          :limit="limit"
          :page="page"
        />
      </table>
    </div>
    <PaginationComponents
      v-if="data"
      :articlesCount="data.data.articlesCount"
      :limit="limit"
      :page="page"
    />
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import useArticlesQuery from '@/utils/useArticlesQuery'
// component
import TableBody from './TableBody.vue'
import PaginationComponents from './PaginationComponents.vue'

const route = useRoute()

// in /articles it will query the page 1 and for /articles/page/:page query the :page
const limit = route.query.limit ? +route.query.limit : 10
const page = route.params.page ? +route.params.page : 1

const { data, isError, isPending } = useArticlesQuery(page, limit)
</script>

<style scoped>
#main-heading {
  position: sticky;
  top: 0;
  background-color: white;
}
thead tr {
  background-color: var(--silver);
}
</style>

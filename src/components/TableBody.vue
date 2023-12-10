<template>
  <tbody className="{styles.tableBody}">
    <TableRowLoading v-if="props.isPending" />
    <TableRowError v-if="props.isError" />
    <TableRow
      v-else-if="props.data"
      v-for="(data, index) in props.data.data.articles"
      :key="data.slug"
      :article="data"
      :limit="limit"
      :page="page"
      :index="index"
    />
  </tbody>
</template>

<script lang="ts" setup>
import TableRowLoading from '@/components/TableRowLoading.vue'
import TableRowError from '@/components/TableRowError.vue'
import TableRow from '@/components/TableRow.vue'

// type
import { type ArticleDataTypes } from '@/types'

type Props = {
  data?: {
    data: { articles: ArticleDataTypes[]; articlesCount: number }
  }
  isError: boolean
  isPending: boolean
  limit: number
  page: number
}

const props = defineProps<Props>()
</script>

<style lang="scss" scoped></style>

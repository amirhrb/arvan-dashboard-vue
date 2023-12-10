<template>
  <tr>
    <td>{{ rowNumber }}</td>
    <td>
      <span v-for="line in briefTitle" :key="line">{{ line }}</span
      >{{ props.article.title.split(' ').length > 18 ? '...' : '' }}
    </td>
    <td>{{ props.article.author.username }}</td>
    <td>
      <span
        v-for="tag in props.article.tagList"
        :key="tag"
        class="badge text-bg-primary text-white m-1"
      >
        # {{ tag }}
      </span>
    </td>
    <td>
      <span v-for="line in briefBody" :key="line">{{ line }}</span
      >{{ props.article.body.split(' ').length > 20 ? '...' : '' }}
    </td>
    <DateTableCell :article="props.article" />
  </tr>
</template>

<script lang="ts" setup>
import DateTableCell from './DateTableCell.vue'
// type
import { type ArticleDataTypes } from '@/types'
import { ref } from 'vue'

const props = defineProps<{
  article: ArticleDataTypes
  limit: number
  page: number
  index: number
}>()

const rowNumber = ref((props.page - 1) * props.limit + props.index + 1)

const briefTitle = ref(props.article.title.split(' ').slice(0, 21).join(' ').split(/\\n/))
const briefBody = ref(props.article.body.split(' ').slice(0, 21).join(' ').split(/\\n/))
</script>

<style scoped></style>

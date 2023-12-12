<template>
  <nav aria-label="Page navigation">
    <ul class="pagination">
      <li class="page-item">
        <RouterLink
          class="page-link"
          aria-label="Previous"
          :to="paginationData.left > 1 ? `/articles/page/${paginationData.left}` : '/articles'"
        >
          <span aria-hidden="true">&lt;</span>
        </RouterLink>
      </li>
      <li v-for="number in paginationData.middleButtonsNumbers" class="page-item" :key="number">
        <RouterLink
          class="page-link"
          :to="{ path: number === 1 ? '/articles' : `/articles/page/${number}` }"
        >
          {{ number }}
        </RouterLink>
      </li>

      <li class="page-item">
        <RouterLink
          class="page-link"
          :to="`/articles/page/${paginationData.right}`"
          aria-label="Next"
        >
          <span aria-hidden="true">&gt;</span>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import paginationHandler from '@/utils/paginationHandler'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

type Props = {
  articlesCount: number
}
const props = defineProps<Props>()

const route = useRoute()

const limit = ref(route.query.limit ? +route.query.limit : 10)
const page = ref(route.params.page ? +route.params.page : 1)
const paginationData = ref(
  paginationHandler({
    articlesCount: props.articlesCount,
    limit: limit.value,
    page: page.value
  })
)
watch(route, () => {
  page.value = route.params.page ? +route.params.page : 1
  limit.value = route.query.limit ? +route.query.limit : 10

  paginationData.value = paginationHandler({
    articlesCount: props.articlesCount,
    limit: limit.value,
    page: page.value
  })
})
</script>

<style scoped>
.page-link {
  color: var(--charcoal-grey);
}
nav {
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

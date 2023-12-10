<template>
  <td class="table-cell">
    <span>
      {{ timeString }}
    </span>
    <div class="btn-group" role="group">
      <button
        type="button"
        class="btn btn-primary dropdown-toggle text-white mx-2"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        …
      </button>
      <div class="dropdown-menu">
        <RouterLink class="dropdown-item" :to="`/articles/edit/${props.article.slug}`">
          Edit
        </RouterLink>
        <div class="dropdown-divider"></div>
        <button class="dropdown-item" data-bs-toggle="modal" :data-bs-target="`#${modalId}`">
          Delete
        </button>
      </div>
    </div>
    <!-- Modal -->
    <Teleport to="body">
      <div
        class="modal fade"
        :id="modalId"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">Delete Article</h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">Are you sure to delete Article?</div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary px-4" data-bs-dismiss="modal">
                No
              </button>
              <button
                type="button"
                class="btn btn-danger px-4"
                data-bs-dismiss="modal"
                @click="handleDelete"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
    <!-- Alert -->
    <Teleport to="#main-heading" v-if="mounted">
      <div
        class="alert alert-dismissible"
        style="width: fit-content; margin: 0"
        v-if="alertData.show"
        :class="alertData.type ? `alert-${alertData.type}` : 'alert-danger'"
        role="alert"
      >
        {{ alertData.text }}
        <button
          v-if="alertData.dismissible"
          type="button"
          class="btn-close"
          aria-label="Close"
          @click="alertData.show = false"
        ></button>
      </div>
    </Teleport>
  </td>
</template>

<script lang="ts" setup>
import type { ArticleDataTypes } from '@/types'
import { onMounted, ref } from 'vue'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import deleteArticle from '@/utils/deleteArticle'

const mounted = ref(false)
onMounted(() => {
  mounted.value = true
})

const props = defineProps<{
  article: ArticleDataTypes
}>()

// to solve Modal problems in having same id issue we have to create unique ids
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
let result = ''
for (let num = 18; num >= 0; --num) {
  result += characters.charAt(Math.floor(Math.random() * characters.length))
}
const modalId = ref(result)

const timeString = ref(
  new Date(props.article.createdAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
)

const alertData = ref({ type: 'danger', text: '', show: false, dismissible: false })

// access to client
const queryClient = useQueryClient()

const deleteArticleMutation = useMutation({
  mutationFn: deleteArticle,
  onSuccess: (e) => {
    // Invalidate and refetch
    if (e.status !== 204) {
      alertData.value = {
        show: true,
        text: 'You are not authorized to delete this article',
        type: 'danger',
        dismissible: true
      }
    } else {
      alertData.value = {
        show: true,
        text: 'Article deleted successfuly',
        type: 'success',
        dismissible: true
      }
      queryClient.invalidateQueries({ queryKey: ['articles'] })
    }
  },
  onError: (err) => {
    alertData.value = { show: true, text: err.message, type: 'danger', dismissible: true }
  }
})
const handleDelete = () => {
  deleteArticleMutation.mutate(props.article.slug)
}
</script>

<style scoped>
.table-cell {
  white-space: nowrap;
}
.modal-body {
  min-height: 90px;
}
</style>

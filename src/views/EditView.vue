<template>
  <div class="main-container">
    <div class="form-container">
      <Form
        :validation-schema="validationSchema"
        @submit="onSubmit"
        v-on:keydown="
          (e) => {
            if (e.key === 'Enter') e.preventDefault()
          }
        "
      >
        <div class="form-grid">
          <div>
            <TextInput
              :disabled="isPending"
              :value="title"
              label="Title"
              placeholder="Title"
              type="text"
              name="title"
            />
            <TextInput
              :disabled="isPending"
              :value="description"
              label="description"
              placeholder="Description"
              type="text"
              name="description"
            />
            <TextInput
              :disabled="isPending"
              :value="body"
              label="Body"
              :textarea="true"
              :rows="10"
              placeholder="Body"
              type="text"
              name="body"
            />
          </div>
          <div class="side-form">
            <div class="input-container mb-2">
              <label>Tags</label>
              <input
                :disabled="isPending"
                v-on:keydown="
                  (e) => {
                    if (e.key === 'Enter') addTagHandler(e)
                  }
                "
                type="text"
                placeholder="New tag"
                class="form-control"
              />
            </div>
            <div v-if="allTags" class="checkbox-container">
              <div v-for="tag in allTags" class="form-check" :key="tag.tag">
                <input
                  type="checkbox"
                  :checked="tag.checked"
                  @change="() => checkHandler(tag)"
                  class="form-check-input"
                  :id="tag.tag"
                />
                <label :for="tag.tag">{{ tag.tag }}</label>
              </div>
            </div>
          </div>
        </div>
        <button :disabled="isPending" type="submit" class="btn btn-primary text-white">
          {{ isPending ? 'loading' : 'Submit' }}
        </button>
      </Form>
    </div>
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
  </div>
</template>

<script lang="ts" setup>
import TextInput from '@/components/TextInput.vue'
import { editArticle } from '@/utils/editArticle'
import getAllTags from '@/utils/getAllTags'
import getArticle from '@/utils/getArticle'
import sortTags from '@/utils/sortTags'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { toTypedSchema } from '@vee-validate/yup'
import { Form } from 'vee-validate'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import * as yup from 'yup'

// basic needed things
const mounted = ref(false)
const isPending = ref(true)
const body = ref('')
const description = ref('')
const title = ref('')
onMounted(() => (mounted.value = true))
const alertData = ref({ type: 'danger', text: '', show: false, dismissible: false })
const router = useRouter()
const route = useRoute()
const queryClient = useQueryClient()
// tyeps
type ArrOfTags = [] | { tag: string; checked: boolean }[]
const validationSchema = toTypedSchema(
  yup.object({
    title: yup.string().trim().required('Required field'),
    description: yup.string().trim().required('Required field'),
    body: yup.string().trim().required('Required field')
  })
)

const slug = typeof route.params.slug === 'string' ? route.params.slug : ''

// get all kinds of tags
const allTags = ref<ArrOfTags>([])
getAllTags().then(({ data }: any) => {
  allTags.value = sortTags(
    data.tags.map((tag: string) => ({ tag, checked: false }) as { tag: string; checked: boolean })
  )
  // load current article data
  getArticle(slug)
    .then(({ data }) => {
      body.value = data.article.body
      description.value = data.article.description
      title.value = data.article.title
      // get and format current previous checked tags
      const formatted = data.article.tagList.map((i: string) => ({ tag: i, checked: true }))
      // filter out already existing tags and except them
      const exceptedTags = allTags.value
        .map((t) => ({ tag: t.tag, checked: t.checked }))
        .filter((t) => !data.article.tagList.includes(t.tag))
      allTags.value = sortTags([...formatted, ...exceptedTags])
      isPending.value = false
    })
    .catch(() => {
      router.push('/')
    })
})
const checkHandler = (item: { tag: string; checked: boolean }) => {
  const checkedTagIndex = allTags.value.findIndex((i) => i.tag === item.tag)
  allTags.value[checkedTagIndex].checked = !allTags.value[checkedTagIndex].checked
}

const addTagHandler = (e: any) => {
  const trimedValue = e.target.value.trim()
  if (trimedValue) {
    const repeatedIndex = allTags.value.findIndex((item) => item.tag === trimedValue)
    if (trimedValue) {
      if (repeatedIndex !== -1) {
        const exceptedTags = allTags.value.filter((i) => i.tag !== trimedValue)
        allTags.value = sortTags([
          ...exceptedTags.map((i) => ({ tag: i.tag, checked: i.checked })),
          { tag: trimedValue, checked: true }
        ])
      } else {
        allTags.value = sortTags([
          ...allTags.value.map((i) => ({ tag: i.tag, checked: i.checked })),
          { tag: trimedValue, checked: true }
        ])
      }
    }
  }
  e.target.value = ''
}
const editArticleMutation = useMutation({
  mutationKey: ['articles'],
  mutationFn: editArticle,
  onSuccess: (e) => {
    if (e && e.response && e.response.status === 403) {
      alertData.value = {
        type: 'danger',
        text: e.response.data.message,
        show: true,
        dismissible: false
      }
      router.back()
    } else {
      queryClient.invalidateQueries({ queryKey: ['articles'] })
      alertData.value = {
        type: 'success',
        text: 'Well done! Article updated successfuly',
        show: true,
        dismissible: false
      }
      router.back()
    }
  },
  onError: (e) => {
    alertData.value = { type: 'danger', text: e.message, show: true, dismissible: false }
  }
})
const onSubmit = (e: any) => {
  const checkedTags = allTags.value.filter((i) => i.checked).map((i) => i.tag)
  const data = {
    article: {
      body: e.body,
      description: e.description,
      title: e.title,
      tagList: [...checkedTags]
    }
  }
  editArticleMutation.mutate({ slug, data })
}
</script>

<style scoped>
textarea {
  resize: none;
}
#main-heading {
  position: sticky;
  top: 0;
  background-color: white;
}
.main-container {
  min-height: calc(100svh - var(--header-min-height));
}
.form-container {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.form-grid {
  width: 100%;
  display: grid;
  column-gap: 30px;
  grid-template-columns: 7fr 3fr;
}
form button {
  display: block;
}
.side-form {
  display: flex;
  flex-direction: column;
  padding: 0 0 15px 0;
}
.checkbox-container {
  flex-grow: 1;
  padding: 15px;
  border: solid 1px #ddd;
  border-radius: 4px;
}
@media screen and (max-width: 769px) {
  .form-container form .form-grid {
    display: flex;
    flex-direction: column;
  }
}
</style>

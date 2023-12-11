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
            <TextInput label="Title" placeholder="Title" type="text" name="title" />
            <TextInput
              label="description"
              placeholder="Description"
              type="text"
              name="description"
            />
            <TextInput label="Body" :textarea="true" placeholder="Body" type="text" name="body" />
          </div>
          <div class="side-form">
            <div class="input-container mb-2">
              <label>Tags</label>
              <input
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
import { postArticle } from '@/utils/createArticle'
import getAllTags from '@/utils/getAllTags'
import sortTags from '@/utils/sortTags'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { toTypedSchema } from '@vee-validate/yup'
import { Form } from 'vee-validate'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import * as yup from 'yup'

const isPending = ref(false)
const mounted = ref(false)
onMounted(() => (mounted.value = true))
const alertData = ref({ type: 'danger', text: '', show: false, dismissible: false })
const router = useRouter()
const queryClient = useQueryClient()
// tyeps
type ArrOfTags = [] | { tag: string; checked: boolean }[]
const validationSchema = toTypedSchema(
  yup.object({
    title: yup.string().required('Required field'),
    description: yup.string().required('Required field'),
    body: yup.string().required('Required field')
  })
)
const allTags = ref<ArrOfTags>([])

getAllTags().then((data: any) => {
  allTags.value = sortTags(
    data.data.tags.map(
      (tag: string) => ({ tag, checked: false }) as { tag: string; checked: boolean }
    )
  )
})

const checkHandler = (item: { tag: string; checked: boolean }) => {
  const checkedTagIndex = allTags.value.findIndex((i) => i.tag === item.tag)
  allTags.value[checkedTagIndex].checked = !allTags.value[checkedTagIndex].checked
}

const addTagHandler = (e: any) => {
  const repeatedIndex = allTags.value.findIndex((item) => item.tag === e.target.value)
  if (e.target.value) {
    if (repeatedIndex !== -1) {
      const exceptedTags = allTags.value.filter((i) => i.tag !== e.target.value)
      allTags.value = sortTags([
        ...exceptedTags.map((i) => ({ tag: i.tag, checked: i.checked })),
        { tag: e.target.value, checked: true }
      ])
    } else {
      allTags.value = sortTags([
        ...allTags.value.map((i) => ({ tag: i.tag, checked: i.checked })),
        { tag: e.target.value, checked: true }
      ])
    }
  }
  e.target.value = ''
}
const postArticleMutation = useMutation({
  mutationKey: ['articles'],
  mutationFn: postArticle,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['articles'] })
    alertData.value = {
      type: 'success',
      text: 'Well done! Article created successfuly',
      show: true,
      dismissible: false
    }
    router.push('/')
  },
  onError: (e) => {
    alertData.value = { type: 'danger', text: e.message, show: true, dismissible: false }
    isPending.value = false
  }
})
const onSubmit = (e: any) => {
  isPending.value = true
  const checkedTags = allTags.value.filter((i) => i.checked).map((i) => i.tag)
  const data = {
    article: {
      body: e.body,
      description: e.description,
      title: e.title,
      tagList: [...checkedTags]
    }
  }
  postArticleMutation.mutate(data)
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

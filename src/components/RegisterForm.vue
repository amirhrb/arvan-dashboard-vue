<template>
  <div class="form-box">
    <Form :validation-schema="validationSchema" @submit="onSubmit">
      <h2>Register</h2>
      <TextInput name="username" label="User" type="text" />

      <TextInput name="email" label="Email" type="text" />

      <TextInput name="password" label="Password" type="password" />

      <button type="submit" class="btn btn-primary text-white w-100" :disabled="loading">
        {{ loading ? 'in process...' : 'Login' }}
      </button>
      <p class="Text-Style">Already Registered? <RouterLink to="/">Login</RouterLink></p>
    </Form>
    <Teleport to="body">
      <div
        class="alert alert-dismissible"
        style="width: fit-content; position: fixed; top: 20px; right: 20px"
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
import registerHandler from '@/utils/registerHandler'
import TextInput from './TextInput.vue'
import { Form } from 'vee-validate'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import * as yup from 'yup'
import { toTypedSchema } from '@vee-validate/yup'

const router = useRouter()

const alertData = ref({ type: 'danger', text: '', show: false, dismissible: false })

const loading = ref(false)

const validationSchema = toTypedSchema(
  yup.object({
    email: yup.string().email('Invalid email format').required('Required field'),
    password: yup.string().required('Required field'),
    username: yup.string().required('Required field')
  })
)

const onSubmit = async (formData: any) => {
  loading.value = true
  const response = await registerHandler({
    email: formData.email,
    password: formData.password,
    username: formData.username
  })
  if (response?.status === 'success') {
    router.push({ path: '/articles', replace: true })
  } else {
    alertData.value = { show: true, text: response.message, type: 'danger', dismissible: true }
    loading.value = false
  }
}
</script>

<style scoped>
.form-box {
  width: 100%;
  max-width: 450px;
  padding: 40px 20px 0;
  border-radius: 4px;
  background-color: var(--silver);
}
.form-box h2 {
  font-size: 47px;
  font-weight: 400;
  color: var(--warm-grey);
  text-align: center;
}
.form-box p {
  font-size: small;
  margin-top: 15px;
}
.form-box p a {
  font-weight: 700;
  text-decoration: none;
  color: var(--charcoal-grey);
}
</style>

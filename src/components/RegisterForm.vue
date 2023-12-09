<template>
  <div class="form-box">
    <form ref="formRef" class="needs-validation" novalidate @submit.prevent="formHandler">
      <h2>Register</h2>
      <div class="mb-4">
        <label for="FormInputEmail1" class="form-label">User</label>
        <input
          v-model="formData.username"
          type="text"
          class="form-control"
          id="FormInputEmail1"
          :disabled="loading"
          required
        />
        <div class="invalid-feedback">this fieled in required</div>
      </div>

      <div class="mb-4">
        <label for="FormInputEmail1" class="form-label">Email</label>
        <input
          v-model="formData.email"
          type="email"
          class="form-control"
          id="FormInputEmail1"
          :disabled="loading"
          required
        />
        <div class="invalid-feedback">this fieled in required</div>
      </div>

      <div class="mb-4 permanent-invalid-input">
        <label for="FormInputPassword1" class="form-label">Password</label>
        <input
          v-model="formData.password"
          type="password"
          class="form-control"
          id="FormInputPassword1"
          :disabled="loading"
          required
        />
        <div class="invalid-feedback">this fieled in required</div>
      </div>

      <button type="submit" class="btn btn-primary text-white w-100" :disabled="loading">
        {{ loading ? 'in process...' : 'Login' }}
      </button>
      <p class="Text-Style">Already Registered? <RouterLink to="/">Login</RouterLink></p>
    </form>
  </div>
  <Teleport to="#main-container">
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
</template>

<script lang="ts" setup>
import registerHandler from '@/utils/registerHandler'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const alertData = ref({ type: 'danger', text: '', show: false, dismissible: false })

const formRef = ref()
const formData = ref({ email: '', password: '', username: '' })
const loading = ref(false)

const formHandler = async (event: any) => {
  loading.value = true
  if (!event.target.checkValidity()) {
    event.preventDefault()
    event.stopPropagation()
    formRef.value.classList.add('was-validated')
  } else {
    const response = await registerHandler({
      email: formData.value.email,
      password: formData.value.password,
      username: formData.value.username
    })
    if (response?.status === 'success') {
      router.push({ path: '/articles', replace: true })
    } else {
      alertData.value = { show: true, text: response.message, type: 'danger', dismissible: true }
    }
  }
  loading.value = false
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

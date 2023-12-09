<template>
  <div class="form-box">
    <form ref="formRef" class="needs-validation" novalidate @submit.prevent="formHandler">
      <h2>LOGIN</h2>
      <div class="mb-5">
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

      <div class="mb-5 permanent-invalid-input">
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

      <button type="submit" class="btn btn-primary w-100" :disabled="loading">
        {{ loading ? 'in process...' : 'Login' }}
      </button>
      <p class="Text-Style">
        Don’t have account? <RouterLink to="/register">Register Now</RouterLink>
      </p>
    </form>
  </div>
</template>

<script lang="ts" setup>
import loginHandler from '@/utils/loginHandler'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const formRef = ref()
const formData = ref({ email: '', password: '' })
const loading = ref(false)

const formHandler = async (event: any) => {
  loading.value = true
  if (!event.target.checkValidity()) {
    event.preventDefault()
    event.stopPropagation()
    formRef.value.classList.add('was-validated')
  } else {
    const response = await loginHandler({
      email: formData.value.email,
      password: formData.value.password
    })
    if (response?.status === 'success') {
      router.push({ path: '/articles', replace: true })
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

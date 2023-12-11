<script setup lang="ts">
import { onUpdated, toRef } from 'vue'
import { useField } from 'vee-validate'

const props = defineProps({
  type: {
    type: String,
    default: 'text'
  },
  textarea: {
    type: Boolean,
    default: false
  },
  value: {
    type: String,
    default: undefined
  },
  name: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: ''
  },
  rows: {
    type: Number,
    default: 6
  }
})

const name = toRef(props, 'name')

const {
  value: inputValue,
  setValue,
  errorMessage,
  handleBlur,
  handleChange
} = useField(name, undefined, {
  initialValue: props.value
})
onUpdated(() => {
  if (props.value) {
    setValue(props.value, true)
  }
})
</script>

<template>
  <div class="input-container">
    <label :for="name" :class="{ 'error-label': !!errorMessage }">{{ label }}</label>
    <textarea
      v-if="textarea"
      :name="name"
      :disabled="disabled"
      :id="name"
      :type="type"
      :value="inputValue ? inputValue : props.value"
      :placeholder="placeholder"
      :rows="rows"
      @input="handleChange"
      @blur="handleBlur"
      class="form-control"
      :class="{ 'is-invalid': !!errorMessage }"
      required
    />
    <input
      v-else
      :name="name"
      :disabled="disabled"
      :id="name"
      :type="type"
      :value="inputValue ? inputValue : props.value"
      :placeholder="placeholder"
      @input="handleChange"
      @blur="handleBlur"
      class="form-control"
      :class="{ 'is-invalid': !!errorMessage }"
      required
    />
    <span class="error-text">{{ errorMessage }}</span>
  </div>
</template>

<style scoped>
.input-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}
.error-text {
  width: 100%;
  margin-top: 0.25rem;
  font-size: 0.875em;
  color: var(--bs-form-invalid-color);
}
.error-label {
  color: var(--bs-form-invalid-color);
}
</style>

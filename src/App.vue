<template>
  <div class="main-container">
    <RouterView />
  </div>
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>
<style scoped>
.main-container {
  min-height: 100vh;
  min-width: 100vw;
}
</style>

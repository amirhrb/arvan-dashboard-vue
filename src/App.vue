<template>
  <div class="main-container" id="main-container">
    <RouterView v-slot="{ Component }">
      <Transition name="route">
        <component :is="Component" />
      </Transition>
    </RouterView>
    <VueQueryDevtools position="right" />
  </div>
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
</script>
<style scoped>
.main-container {
  min-height: 100vh;
  min-width: 100vw;
}
.route-enter-active,
.route-leave-active {
  transition: opacity 0.1s linear;
}

.route-enter-from,
.route-leave-to {
  opacity: 0;
}
</style>

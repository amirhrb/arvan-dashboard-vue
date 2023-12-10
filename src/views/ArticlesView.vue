<template>
  <div>
    <HeaderCmponent />
    <div class="content-grid">
      <AsideComponent class="sidebar" />
      <main class="main">
        <RouterView v-slot="{ Component }">
          <Transition name="fade">
            <component :is="Component" />
          </Transition>
        </RouterView>
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import HeaderCmponent from '@/components/HeaderComponent.vue'
import AsideComponent from '@/components/AsideComponent.vue'
</script>

<style scoped>
.content-grid {
  max-width: 100vw;
  width: 100%;
  height: calc(100vh - var(--header-min-height));
  display: grid;
  grid-template-columns: 2fr 10fr;
  overflow-x: hidden;
}
@media screen and (max-width: 768px) {
  .content-grid {
    height: calc(100vh - var(--header-max-height));
  }
}
.main {
  overflow: hidden;
  padding: 0 30px 30px 30px;
  overflow: auto;
  max-width: calc(100vw - 200px);
}
.sidebar {
  min-width: 200px;
  display: block;
  position: sticky;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s linear;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

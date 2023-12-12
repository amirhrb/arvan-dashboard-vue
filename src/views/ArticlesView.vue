<template>
  <div>
    <HeaderCmponent />
    <div class="content-grid">
      <AsideComponent class="sidebar" />
      <main class="main">
        <div class="py-4 d-flex align-items-center justify-content-between z-3" id="main-heading">
          <h1>{{ route.meta.heading }}</h1>
        </div>
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
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<style scoped>
#main-heading {
  position: sticky;
  top: 0;
  background-color: white;
}
.content-grid {
  max-width: 100vw;
  width: 100%;
  height: calc(100vh - 200px);
  display: grid;
  grid-template-columns: 2fr 10fr;
  overflow-x: hidden;
}
.main {
  overflow: hidden;
  padding: 0 30px 30px 30px;
  overflow: auto;
  max-width: calc(100vw - 200px);
}
.sidebar {
  min-width: 200px;
  position: sticky;
}
@media screen and (max-width: 768px) {
  .content-grid {
    height: calc(100vh - var(--header-max-height));
    grid-template-columns: 1fr;
  }
  .main {
    overflow: hidden;
    padding: 0 30px 30px 30px;
    overflow: auto;
    max-width: 100vw;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s linear;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

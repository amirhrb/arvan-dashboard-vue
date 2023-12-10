<template>
  <nav class="navbar">
    <div class="container-lg container-box">
      <div class="texts-container">
        <h2 class="heading">Arvan Challenge</h2>

        <div v-if="isPending" class="spinner-border text-light spinner-border-sm" role="status">
          <span class="sr-only"></span>
        </div>
        <span v-else-if="data">Welcome {{ data.user.username }} </span>
      </div>
      <button type="button" class="btn btn-outline-info" @click="logoutHandler">Logout</button>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import useUserData from '@/utils/useUserData'
import { useRouter } from 'vue-router'

const router = useRouter()

const { isPending, data } = useUserData()

const logoutHandler = () => {
  localStorage.clear()
  router.push('/')
}
</script>

<style scoped>
h2 {
  margin: 0;
  padding: 0;
}
.navbar {
  width: 100vw;
  min-height: var(--header-min-height);
  position: sticky;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--charcoal-grey);
  color: #fff;
}
.container-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.texts-container {
  display: flex;
  align-items: center;
  column-gap: 15px;
}
@media screen and (max-width: 768px) {
  .navbar {
    height: var(--header-max-height);
  }
  .texts-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>

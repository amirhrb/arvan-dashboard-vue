<template>
  <div class="container">
    <h1>404</h1>
    <h2>page not found...</h2>
    <RouterLink to="/">
      <button class="btn btn-outline-secondary" type="button">home</button>
    </RouterLink>
  </div>
</template>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>

<template>
  <aside class="sidebar bg-primary">
    <h2>Post</h2>
    <ul class="u-list">
      <li>
        <RouterLink to="/articles" exact-active-class="active"> All Articles </RouterLink>
      </li>
      <li>
        <RouterLink to="/articles/create" exact-active-class="active"> New Article </RouterLink>
      </li>
    </ul>
  </aside>
</template>

<script lang="ts" setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.sidebar {
  color: white;
  display: block;
  position: fixed;
}
h2 {
  margin: 10px 20px;
  font-size: 22px;
  font-weight: normal;
}
.u-list {
  display: block;
  padding: 0;
  margin: 0;
  text-align: center;
}
li {
  list-style: none;
}
li a {
  width: 100%;
  height: 100%;
  padding: 10px 20px 10px 30px;
  display: inline-block;
  color: white;
  white-space: nowrap;
  text-decoration: none;
  transition: color 0.1s linear;
}
li a:hover {
  color: #ccc;
}
.active {
  background-color: var(--white-15);
}
@media screen and (max-width: 768px) {
  .sidebar {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .u-list {
    display: flex;
  }
  h2 {
    margin: auto 10px;
  }
}
</style>

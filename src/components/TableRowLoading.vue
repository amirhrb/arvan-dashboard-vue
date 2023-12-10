<template>
  <tr>
    <td v-for="item in Array.from(Array(6).keys())" :key="item">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </td>
  </tr>
</template>

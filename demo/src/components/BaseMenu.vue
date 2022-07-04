<script lang="ts" setup>
import { isDark, toggleDark } from '~/composables'
</script>

<template>
  <nav class="flex justify-center items-center" m="t-4">
    <button class="icon-btn transition" :style="{ color: isDark ? '' : 'orange' }" @click="toggleDark()">
      <div i="ri-sun-line dark:ri-moon-line" />
    </button>
  </nav>
</template>

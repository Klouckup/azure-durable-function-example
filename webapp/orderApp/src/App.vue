<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="container mx-auto text-gray-400">
      <nav class="flex">
        <RouterLink to="/" class="hover:text-white">Home</RouterLink>
        <RouterLink to="/orders" class="ml-2 hover:text-white">Orders</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
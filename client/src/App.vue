<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import { useAuth0 } from '@auth0/auth0-vue'
import Loader from './components/Loader.vue'
const { isLoading } = useAuth0()
</script>

<template>
  <header>
    <Header />
  </header>

  <div class="container mx-auto px-4 app-container">
    <Loader v-if="isLoading" />
    <RouterView v-else />
  </div>
</template>
<style scoped>
.app-container {
  padding-top: 70px;
  padding-bottom: 70px;
}
</style>

<script setup lang="ts">
import { logout } from '../services/authService'
// Define the handleLogout function
const handleLogout = async () => {
  await logout()
}
</script>

<template>
  <div class="h-screen flex items-center justify-center">
    <div
      class="my-5 border border-gray-200 p-5 mx-auto w-96 shadow-md rounded-md"
    >
      <h2>{{ $t('home.title') }}</h2>
      <hr class="my-3" />
      <p>{{ $t('home.welcome') }}</p>
      <button
        class="bg-blue-500 text-white p-2 mt-3 text-center w-full"
        @click="handleLogout"
      >
        {{ $t('home.logoutButton') }}
      </button>

      <div class="my-3">
        <router-link :to="{ name: 'Login' }">
          {{ $t('home.loginLink') }}
        </router-link>
      </div>
    </div>
  </div>
</template>

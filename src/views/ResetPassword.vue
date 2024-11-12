<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  name: 'ResetPassword',
  setup() {
    const router = useRouter()
    const route = useRoute() // Access route parameters
    const username = ref('')
    const password = ref('')
    const errorMessage = ref('')
    const token = route.params.token // Access the token parameter

    const handleRegister = async () => {
      try {
        await register(username.value, password.value, token) // Use token if needed in API
        router.push({ name: 'Login' })
      } catch (error) {
        errorMessage.value = error.response.data.message
      }
    }

    return {
      username,
      password,
      errorMessage,
      token,
      handleRegister,
    }
  },
})
</script>

<template>
  <div class="h-screen flex items-center justify-center">
    <div
      class="my-5 border border-gray-200 p-5 mx-auto w-96 shadow-md rounded-md"
    >
      <h2>{{ $t('register.title') }}</h2>
      <hr class="my-3" />
      <form @submit.prevent="handleRegister">
        <div class="my-3">
          <label for="username">{{ $t('register.username') }}</label>
          <input
            type="text"
            id="username"
            v-model="username"
            required
            class="w-full border border-gray-300 p-1"
          />
        </div>
        <div class="my-3">
          <label for="password">{{ $t('register.password') }}</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            class="w-full border border-gray-300 p-1"
          />
        </div>
        <button
          type="submit"
          class="bg-blue-500 text-white p-2 mt-3 text-center w-full"
        >
          {{ $t('register.registerButton') }}
        </button>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </form>
      <div class="my-3">
        <router-link :to="{ name: 'Login' }">
          {{ $t('register.loginLink') }}
        </router-link>
      </div>
      <span>Token: {{ token }}</span>
    </div>
  </div>
</template>

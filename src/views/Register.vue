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
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '../services/authService'

export default defineComponent({
  name: 'UserRegister',
  setup() {
    const router = useRouter()
    const username = ref('')
    const password = ref('')
    const errorMessage = ref('')

    const handleRegister = async () => {
      try {
        await register(username.value, password.value)
        router.push({ name: 'Login' })
      } catch (error) {
        errorMessage.value = error.response.data.message
      }
    }

    return {
      username,
      password,
      errorMessage,
      handleRegister,
    }
  },
})
</script>

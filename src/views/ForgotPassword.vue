<template>
  <div class="h-screen flex items-center justify-center">
    <div
      class="my-5 border border-gray-200 p-5 mx-auto w-96 shadow-md rounded-md"
    >
      <h2>{{ $t('forgotPassword.title') }}</h2>
      <hr class="my-3" />
      <form @submit.prevent="handleForgotPassword">
        <div class="my-3">
          <label for="email">{{ $t('forgotPassword.email') }}</label>
          <input
            type="email"
            id="email"
            v-model="email"
            required
            class="w-full border border-gray-300 p-1"
          />
        </div>
        <button
          type="submit"
          class="bg-blue-500 text-white p-2 mt-3 text-center w-full"
        >
          {{ $t('forgotPassword.sendButton') }}
        </button>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </form>
      <div class="my-3">
        <router-link :to="{ name: 'Login' }">
          {{ $t('forgotPassword.loginLink') }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { forgotPassword } from '../services/authService'

export default defineComponent({
  name: 'ForgotPassword',
  setup() {
    const router = useRouter()
    const email = ref('')
    const errorMessage = ref('')

    const handleForgotPassword = async () => {
      try {
        await forgotPassword(email.value)
        router.push({ name: 'Login' })
      } catch (error) {
        errorMessage.value = error.response.data.message
      }
    }

    return {
      email,
      errorMessage,
      handleForgotPassword,
    }
  },
})
</script>

<template>
  <div class="h-screen flex items-center justify-center">
    <div
      class="my-5 border border-gray-200 p-5 mx-auto w-96 shadow-md rounded-md"
    >
      <h2>{{ $t('login.title') }}</h2>
      <hr class="my-3" />
      <form @submit.prevent="handleLogin">
        <div class="my-3">
          <label for="email">{{ $t('login.email') }}</label>
          <input
            type="text"
            id="email"
            v-model="email"
            required
            class="w-full border border-gray-300 p-1"
          />
        </div>
        <div class="my-3">
          <label for="password">{{ $t('login.password') }}</label>
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
          {{ $t('login.loginButton') }}
        </button>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </form>
      <div class="flex flex-col gap-3 my-3">
        <router-link :to="{ name: 'Register' }">
          {{ $t('login.registerLink') }}
        </router-link>
        <router-link :to="{ name: 'ForgotPassword' }">
          {{ $t('login.forgotPasswordLink') }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../services/authService'

export default defineComponent({
  name: 'UserLogin',
  setup() {
    const router = useRouter()
    const email = ref('')
    const password = ref('')
    const errorMessage = ref('')

    const handleLogin = async () => {
      try {
        const data = await login(email.value, password.value)
        // Redirect to the home page after successful login
        if (data) {
          await router.push({ name: 'AdminDashboard' })
        } else {
          alert('Invalid credentials')
        }
      } catch (error) {
        errorMessage.value =
          (error as { response?: { data?: { message?: string } } })?.response
            ?.data?.message || 'An error occurred'
      }
    }

    return {
      email,
      password,
      errorMessage,
      handleLogin,
    }
  },
})
</script>

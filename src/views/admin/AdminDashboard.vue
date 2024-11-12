<script lang="ts">
import { logout } from '@/services/authService'
import { defineComponent, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

interface User {
  id: string
  name: string
  email: string
  role: string
}

export default defineComponent({
  name: 'AdminDashboard',
  setup() {
    const token = ref<string | null>(null)

    const user = ref<User | null>(null)

    const router = useRouter()

    if (!localStorage.getItem('token')) {
      router.push({ name: 'Login' })
    }

    onMounted(() => {
      token.value = localStorage.getItem('token')
      user.value = JSON.parse(localStorage.getItem('user') || '{}')
    })

    const handleLogout = async () => {
      const res = await logout()

      if (res) {
        router.push({ name: 'Login' })
      } else {
        alert('An error occurred')
      }
    }

    return {
      token,
      user,
      handleLogout,
    }
  },
})
</script>

<template>
  <div class="h-screen flex items-center justify-center">
    <div
      class="my-5 border border-gray-200 p-5 mx-auto w-96 shadow-md rounded-md"
    >
      <h2>{{ $t('admin.title') }}</h2>
      <hr class="my-3" />
      <div class="flex flex-col gap-3 my-3">
        <p>{{ $t('admin.welcome') }}</p>
      </div>
      <!-- logout -->
      <div class="flex flex-col gap-3 my-3">
        <button
          class="bg-blue-500 text-white p-2 mt-3 text-center w-full"
          @click="handleLogout"
        >
          {{ $t('home.logoutButton') }}
        </button>
      </div>
      <div class="my-3 flex flex-wrap">
        <ul>
          <li>{{ $t('admin.user.id') }}: {{ user?.id }}</li>
          <li>{{ $t('admin.user.name') }}: {{ user?.name }}</li>
          <li>{{ $t('admin.user.email') }}: {{ user?.email }}</li>
          <li>{{ $t('admin.user.role') }}: {{ user?.role }}</li>
        </ul>
        <!-- adjust the full token here using tailwind -->
        <div v-if="token" class="w-full flex flex-col">
          <p>{{ $t('admin.token') }}:</p>
          <p class="break-all">{{ token }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

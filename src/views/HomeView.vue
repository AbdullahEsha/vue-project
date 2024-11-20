<script setup lang="ts"></script>

<template>
  <div class="h-screen flex items-center justify-center">
    <div
      class="my-5 border border-gray-200 p-5 mx-auto w-96 shadow-md rounded-md"
    >
      <div class="flex justify-between">
        <h2>{{ $t('home.title') }}</h2>
        <div>
          <select v-model="$i18n.locale">
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
        </div>
      </div>
      <hr class="my-3" />
      <p>{{ $t('home.welcome') }}</p>
      <div class="my-3">
        <router-link :to="{ name: 'Login' }">
          {{ $t('home.loginLink') }}
        </router-link>
      </div>
    </div>
  </div>
</template>

# Vue Task Project

This repository contains a full-stack application using Vue.js with TypeScript for the frontend and Express with TypeScript for the backend. It includes basic features like authentication, localization (i18n), and session management.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

- For starting fresh:

```bash
npm init vue@latest
```

`Select options: TypeScript, Router, Pinia, ESLint, and Prettier as required.`
Install Frontend Dependencies

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### For Localization

```bash
npm install axios vue-i18n@next
```

Set Up Vue i18n (Localization), add translation files in src/locales/en.json and src/locales/es.json (for example) to support multiple languages.

### Configure Axios for HTTP Requests

In frontend/src/services, create axiosInstance.ts for Axios configuration.

### Run the Project

```bash
npm run dev || yarn dev
```

The vue-project will start as development in server url `http://localhost:5173`

Testing and Development
Access the Frontend

Open your browser and go to http://localhost:5173.
Access the Backend

1. Initialize Vue

   `Select TypeScript, Router, Pinia, ESLint, Prettier options as required.`

   cd vue-frontend
   npm install
   npm run format
   npm run dev

2. Install Axios for HTTP Requests
   npm install axios

3. Setting Up Vue I18n
   Install the Vue I18n package:
   `npm install vue-i18n@next`

4. Create a folder for translations:

```bash
   src
└── locales
    ├── en
    │   └── translation.json
    └── es
        └── translation.json
```

5. Set Up Axios Configuration
   `frontend/src/services/axiosInstance.ts`

6. Create Authentication Service
   `frontend/src/services/authService.ts`

7. Route protection added based on jwt accesstoken that stored in Local storage

```javascript
import { useRouter } from 'vue-router'

const router = useRouter()

if (!localStorage.getItem('token')) {
  router.push({ name: 'Login' })
}
```

8. For Login and other authentication related methord are in `src\services\authService.ts` file one sample is given bellow,

```javaScript
export const login = async (email: string, password: string) => {
  const response = await axios.post('/auth/login', {
    email,
    password,
  })

  if (response.data.message) {
    localStorage.setItem('token', response.data.accessToken)
    localStorage.setItem('user', JSON.stringify(response.data.user))
    return true
  } else {
    return false
  }
}
```

9.  Is implemented here for `src\views\ResetPassword.vue`

```javaScript
export default defineComponent({
  name: 'ResetPassword',
  setup() {
    // other variabls
    const token = route.params.token // Access the token parameter

    const handleResetPassword = async () => {
      // continue
    }
    return {
    // continue
      token,
    }
  },
})
```

Get and print the token value like this way

```vue
<template>
  <span>Token: {{ token }}</span>
</template>
```

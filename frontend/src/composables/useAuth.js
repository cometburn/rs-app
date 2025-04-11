import {  ref } from 'vue'
import { useAuthStore } from 'src/stores/useAuthStore'
import { api } from 'src/boot/axios'
import { useRouter } from 'vue-router'

export function useAuth() {
  const authStore = useAuthStore()
  const loading = ref(false)
  const error = ref(null)
  const router = useRouter() 

  const signIn = async (email, password) => {
    loading.value = true
    try {
      // Make the API call using the injected $api instance
      const response = await api.post('signin', {
        email,
        password,
      })

      const { user, token } = response.data

      authStore.setUser(user)
      authStore.setToken(token)
      error.value = null
      router.push({ name: 'blogs' })
    } catch (err) {
      console.error(err)
      if (err.response && err.response.status === 401) {
        error.value = 'Invalid email or password'
      } else {
        error.value = 'Something went wrong. Please try again.'
      }
    } finally {
      loading.value = false
    }
  }

  return { signIn, loading, error }
}

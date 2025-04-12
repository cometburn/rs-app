import {  ref } from 'vue'
import { useAuthStore } from 'src/stores/useAuthStore'
import { api } from 'src/boot/axios'
import { useRouter } from 'vue-router'
import { Notify } from 'quasar'

export function useAuth() {
  const authStore = useAuthStore()
  const loading = ref(false)
  const error = ref(null)
  const router = useRouter() 

  const signIn = async (email, password) => {
    loading.value = true
    try {
      const response = await api.post('signin', {
        email,
        password,
      })

      const { user, token } = response.data

      authStore.setUser(user)
      authStore.setToken(token)
      error.value = null
      router.push({ name: 'blogs-child' })
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

  const register = async ({ email, password, password_confirmation }) => {
    try {
      const response = await api.post('/register', {
        email,
        password,
        password_confirmation
      })

      Notify.create({
        position: 'top',
        type: 'positive',
        message: 'Registration successful!',
      })

      router.push({ name: 'login' })
      return response.data
    } catch (error) {
      Notify.create({
        position: 'top',
        type: 'negative',
        message: error.response?.data?.message || 'Registration failed',
      })
      throw error
    }
  }

  return { signIn, register, loading, error }
}

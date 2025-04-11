import { defineStore, acceptHMRUpdate } from 'pinia'

export const useAuthStore = defineStore('auth', {
   state: () => ({
    user: null,
    token: localStorage.getItem('rs-token') || null,
  }),
  getters: {},
  actions: {
    setUser(user) {
      this.user = user
    },
    setToken(token) {
      this.token = token
      localStorage.setItem('rs-token', token)
    },
    clearUser() {
      this.user = null
      this.token = null
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}

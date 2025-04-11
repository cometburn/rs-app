<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-12 col-md-6 col-lg-3">
        <form @submit.prevent="handleSignIn">
          <q-card class="q-pa-md row column">
            <div class="col-12">
              <h4 class="q-ma-none q-mb-md">Sign In</h4>
            </div>
            <div v-if="error" class="col-12">
              <q-banner inline-actions class="text-red q-px-none">
                <q-icon name="error" size="sm" class="q-mr-sm"/>
                <span class="text-caption">{{ error }}</span>
              </q-banner>
            </div>
            <div class="col-12">
              <q-input v-model="email" label="Email" outlined dense :rules="[emailRule]"/>
            </div>
            <div class="col-12">
              <q-input v-model="password" label="Password" type="password" outlined dense :rules="[ val => val.length > 1 || 'Passowrd required.']"/>
            </div>
            <q-card-actions class="q-pa-none full-width">
              <q-btn :loading="loading" :disabled="loading" type="submit" color="primary" size="md" icon="key" label="Sign In" class="q-mt-md full-width" />
            </q-card-actions>
          </q-card>
        </form>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '../composables/useAuth'

const email = ref('')
const password = ref('')
const { signIn, loading, error } = useAuth()

const handleSignIn = () => {
  signIn(email.value, password.value)
}

const emailRule = value => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(value) || 'Please enter a valid email address.';
};
</script>

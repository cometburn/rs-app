<template>
 
  <q-page class="flex flex-center">
    <q-card class="q-pa-lg" style="width: 400px; max-width: 90vw;">
      <q-card-section>
        <div class="text-h6 text-center">Sign In</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit.prevent="handleSignIn" ref="form">
          <div v-if="error" class="col-12">
              <q-banner inline-actions class="text-red q-px-none">
              <q-icon name="error" size="sm" class="q-mr-sm"/>
              <span class="text-caption">{{ error }}</span>
            </q-banner>
          </div>

          <q-input
            v-model="email"
            label="Email"
            type="email"
            outlined
            dense
            :rules="[emailRule]"
          />

          <q-input
            v-model="password"
            label="Password"
            type="password"
            outlined
            dense
            :rules="[val => !!val || 'Password is required']"
          />

          <q-btn :loading="loading" :disabled="loading" type="submit" label="Signin" color="primary" class="full-width" />
        </q-form>
      </q-card-section>

      <q-card-section class="text-center">
        <q-btn flat label="Register" @click.prevent="onGotoRegister" color="primary" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from 'src/composables/useAuth'

const router = useRouter();
const email = ref('')
const password = ref('')
const { signIn, loading, error } = useAuth()

const handleSignIn = async () => {
  await signIn(email.value, password.value)
}

const onGotoRegister = () => {
  router.push({ name: 'register' })
}

const emailRule = value => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(value) || 'Please enter a valid email address.';
};
</script>

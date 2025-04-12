<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-lg" style="width: 400px; max-width: 90vw;">
      <q-card-section>
        <div class="text-h6 text-center">Register</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit.prevent="onRegister" ref="form">
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

          <q-input
            v-model="password_confirmation"
            label="Confirm Password"
            type="password"
            outlined
            dense
            :rules="[
              val => !!val || 'Please confirm password',
              val => val === password || 'Passwords do not match'
            ]"
          />

          <q-btn type="submit" label="Register" color="primary" class="full-width" />
        </q-form>
      </q-card-section>

      <q-card-section class="text-center">
        <q-btn flat label="Back to Login" @click.prevent="onGotoLogin" color="primary" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from 'src/composables/useAuth'

const { register } = useAuth()
const router = useRouter();
const email = ref('')
const password = ref('')
const password_confirmation = ref('')
const form = ref(null)

const onRegister = async () => {
  if (!(await form.value.validate())) return

  await register({
    email: email.value,
    password: password.value,
    password_confirmation: password_confirmation.value
  })
}

const onGotoLogin = () => {
  router.push({ name: 'login' })
}

const emailRule = value => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(value) || 'Please enter a valid email address.';
};
</script>

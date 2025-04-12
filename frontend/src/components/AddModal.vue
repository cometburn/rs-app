<template>
  <q-dialog v-model="internalShow" persistent>

      <q-card style="width: 500px;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Add blog</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <form @submit.prevent="onSubmit">
        <q-card-section>
          <div class="row">
            <div class="col-12 q-mb-md">
              <q-input
                v-model="title"
                label="Title"
                outlined
                dense
                autofocus
              />
            </div>
            <div class="col-12">
              <q-input
                type="textarea"
                v-model="content"
                label="Content"
                outlined
                dense
              />
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="q-ma-sm">
          <q-btn type="submit" label="Submit" color="primary" />
        </q-card-actions>
      </form>
      </q-card>

  </q-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import useBlog from 'src/composables/useBlog'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const internalShow = ref(props.modelValue)
const title = ref('')
const content = ref('')
const { createBlog } = useBlog()

watch(() => props.modelValue, val => {
  internalShow.value = val
})

watch(internalShow, val => {
  emit('update:modelValue', val)
})

const closeModal = () => {
  internalShow.value = false
}

const onSubmit = async () => {
  await createBlog({
    title: title.value, 
    content: content.value
  })
  title.value = ''
  content.value = ''
  closeModal()
}
</script>

<template>
  <q-page padding>
    <div  class="row justify-center">
      <div v-if="blog" class="col-12 col-md-6">
        <section class="row">
          <header class="col-12">
            <h1 class="text-h6">{{ blog.title }}</h1>
          </header>
          <div class="col-12">
            {{ blog.content }}
          </div>
          <div class="col-12 q-mt-xl">
            {{ blog.creator?.email }}
          </div>
        </section>
      </div>
      <div v-else class="col-12 col-md-6">
        <p>Blog not found.</p>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import {  onMounted } from 'vue'; 
import useBlog from 'src/composables/useBlog'; 

const { blog, fetchBlog, } = useBlog();

const props = defineProps({
  id: {
    type: String,
    required: true
  }
});

onMounted(async () => {
  console.log('onMounted', props)
  await fetchBlog(props.id);
});



</script>

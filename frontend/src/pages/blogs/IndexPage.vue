<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-12 col-md-6">
        <section class="row">
          <header class="col-12 q-mb-sm">
              <h1 class="text-h6 float-left q-ma-none">Blogs</h1>
              <q-btn
                color="primary"
                size="sm"
                round
                icon="add"
                class="float-right"
                @click="isAddModalOpen = true"
              />
          </header>
          <div class="col-12">
            <q-table
              flat bordered
              :columns="columns"
              :rows="blogs"
              row-key="id"
              :pagination="initialPagination"
            >
              <template v-slot:top> 
                <q-input
                  v-model="search"
                  label="Search"
                  outlined
                  dense
                  class="full-width"
                  style="width: 100%"
                />
              </template>
              <template v-slot:body-cell-actions="props">
                <q-td :props="props">
                  <q-btn dense flat icon="more_vert" @click.stop>
                    <q-menu auto-close>
                      <q-list>
                        <q-item clickable v-close-popup @click="onEditBlog(props.row)">
                          <q-item-section>Edit</q-item-section>
                        </q-item>
                        <q-item clickable v-close-popup @click="onChangeStatus(props.row)">
                          <q-item-section>Change Status</q-item-section>
                        </q-item>
                        <q-item clickable v-close-popup @click.prevent="onPreviewBlog(props.row)">
                          <q-item-section>Preview</q-item-section>
                        </q-item>
                        <q-item clickable v-close-popup @click="onArchiveBlog(props.row)">
                          <q-item-section>Archive</q-item-section>
                        </q-item>
                      </q-list>
                    </q-menu>
                  </q-btn>
                </q-td>
              </template>
              <template v-slot:body-cell-status="props">
                <q-td :props="props" class="text-capitalize">
                  {{ props.value }}
                </q-td>
              </template>
            </q-table>
          </div>
        </section>
      </div>
    </div>
    <AddModal :modelValue="isAddModalOpen" />
    <EditModal
      :modelValue="isEditModalOpen"
      :blogToEdit="selectedBlog"
      @update:modelValue="isEditModalOpen = $event"
    />
  </q-page>
</template>

<script setup>
import { ref, watch, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router';
import useBlog from 'src/composables/useBlog'; 

import AddModal from 'src/components/AddModal.vue'
import EditModal from 'src/components/EditModal.vue'

const { blogs, searchBlogs, fetchBlogs, changeStatus, archiveBlog } = useBlog();
const router = useRouter();
const isAddModalOpen = ref(false)
let isEditModalOpen = ref(false)
let selectedBlog = ref()
const search = ref('')
const timeout = ref(null)

const initialPagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 50
},)

const columns = [
  { name: 'title', align: 'left', label: 'Title', field: 'title', sortable: true },
  { name: 'status', align: 'center', label: 'Status', field: 'status' },
  { name: 'actions', label: '', field: 'actions', align: 'right' }
]


onBeforeMount(async () => {
  await fetchBlogs();
});

const onChangeStatus = async (row) => {
  await changeStatus(row.id)
}

const onArchiveBlog = async (row) => {
  await archiveBlog(row.id)
}

const onPreviewBlog = async (row) => {
  router.push({ name: 'blog-preview-child', params: { id: row.id } }, { replace: true });
}

const onEditBlog = async (row) => {
  isEditModalOpen.value = true
  selectedBlog.value = row
}

watch(search, (newVal) => {
  if (timeout.value) {
    clearTimeout(timeout.value)
  }

  timeout.value = setTimeout(async () => {
    await searchBlogs(newVal)
  }, 500)
})
</script>

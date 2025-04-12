<template>
  <q-layout>
    <q-page-container>
      <q-header elevated>
        <q-toolbar>
          <q-toolbar-title>Jc Cometa</q-toolbar-title>
        </q-toolbar>
      </q-header>
      <router-view :key="$route.path"/>
    </q-page-container>
  </q-layout>
</template>

<script setup>
</script>

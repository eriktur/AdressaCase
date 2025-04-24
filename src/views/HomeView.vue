<template>
<div id="home">
<header class="app-header">
  <h1 class="title">Min Side</h1>
</header>
<main class="content">
  <CardList v-if="!showForm" @show-form="showForm = true" />
  <CardForm v-else @saved="onSaved" @cancel="showForm = false" />
</main>
</div>
</template>

<script setup>
import { ref } from 'vue'
import CardList from '../components/CardList.vue'
import CardForm from '../components/CardForm.vue'

const showForm = ref(false)

function onSaved() {
  showForm.value = false
}
</script>

<style scoped>

.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  display: flex;
  align-items: center;
  background: #333;
  color: #fff;
  padding: 0.5rem 1rem;
  z-index: 1000;
}
.app-header h1 {
  font-size: 1.3rem;
  color: #fff;
}

.title {
  font-size: 1.25rem;
}

.content {
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
  margin-top: 40px;
  margin-left: 0;
  transition: margin-left 0.3s ease;
}
</style>

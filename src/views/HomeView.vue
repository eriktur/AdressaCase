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
const isMenuOpen = ref(false)

function onSaved() {
  showForm.value = false
}
</script>

<style scoped>
#home {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

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

.hamburger {
  font-size: 1.5rem;
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  margin-right: 1rem;
}

.title {
  font-size: 1.25rem;
}

.sidebar {
  position: fixed;
  top: 60px;
  left: 0;
  width: 250px;
  height: calc(100% - 60px);
  background: #f4f4f4;
  padding: 1rem;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  z-index: 999;
}

.sidebar.open {
  transform: translateX(0);
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  padding: 0.5rem 0;
  cursor: pointer;
}

.content {
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
  margin-top: 60px;
  margin-left: 0;
  transition: margin-left 0.3s ease;
}
</style>

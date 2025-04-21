<template>
<div id="home">
<header class="app-header">
  <button class="hamburger" @click="isMenuOpen = !isMenuOpen">☰</button>
  <h1 class="title">Min Side - Avisutgave</h1>
</header>
<nav v-if="isMenuOpen" class="sidebar">
  <ul>
    <li @click="showForm = false; isMenuOpen = false">Mine kort</li>
    <li @click="showForm = true; isMenuOpen = false">Legg til kort</li>
  </ul>
</nav>
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
  display: flex;
  align-items: center;
  background: #333;
  color: #fff;
  padding: 0.5rem 1rem;
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
  background: #f4f4f4;
  padding: 1rem;
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
  padding: 1rem;
}
</style>

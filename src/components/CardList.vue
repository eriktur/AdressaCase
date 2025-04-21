<template>
  <div class="card-list news">
    <h2>Dine betalingsmetoder</h2>
    <ul>
      <li v-for="card in cards" :key="card.id" class="card-item">
        <div class="card-mask">
          <strong>{{ card.issuer }}</strong> •••• {{ card.cardDetails.toString().slice(-4) }}
        </div>
        <div class="card-expiry">Utløpsdato: {{ card.expiryDate }}</div>
      </li>
    </ul>
    <button @click="$emit('show-form')">Legg til nytt kort</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const cards = ref([])
const baseUrl = import.meta.env.VITE_API_BASE_URL

async function fetchCards() {
  try {
    const res = await axios.get(`${baseUrl}/updatePayMethodDetails`)
    cards.value = res.data
  } catch (err) {
    console.error('Kunne ikke hente kort:', err)
  }
}

onMounted(fetchCards)
</script>

<style scoped>
.news {
  column-count: 2;
  column-gap: 1rem;
}
.card-list {
  max-width: 800px;
  margin: 1rem auto;
}
.card-item {
  border: 1px solid #ddd;
  padding: 1rem;
  margin-bottom: 0.5rem;
  border-radius: 4px;
  break-inside: avoid;
}
.card-mask,
.card-expiry {
  margin-bottom: 0.25rem;
}
button {
  padding: 0.5rem 1rem;
  cursor: pointer;
  margin-top: 1rem;
}
</style>
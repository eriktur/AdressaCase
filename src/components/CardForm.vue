<template>
  <form @submit.prevent="submitForm" class="card-form news">
    <h2>Legg til nytt kort</h2>
    <div>
      <label for="cardDetails">Kortnummer</label>
      <input id="cardDetails" v-model="form.cardDetails" type="text" required maxlength="16" />
    </div>
    <div>
      <label for="expiryDate">Utløpsdato (MM/ÅÅ)</label>
      <input id="expiryDate" v-model="form.expiryDate" type="text" required placeholder="MM/ÅÅ" />
    </div>
    <div>
      <label for="CVV">CVV</label>
      <input id="CVV" v-model="form.CVV" type="password" required maxlength="3" />
    </div>
    <div>
      <label for="issuer">Korttype</label>
      <select id="issuer" v-model="form.issuer" required>
        <option disabled value="">Velg</option>
        <option>VISA</option>
        <option>MASTERCARD</option>
        <option>AMEX</option>
      </select>
    </div>
    <div class="form-buttons">
      <button type="submit">Lagre</button>
      <button type="button" @click="$emit('cancel')">Avbryt</button>
    </div>
  </form>
</template>

<script setup>
import { reactive } from 'vue'
import axios from 'axios'

const emit = defineEmits(['saved', 'cancel'])
const form = reactive({ currency: 'NOK', cardDetails: '', expiryDate: '', CVV: '', issuer: '' })
const baseUrl = import.meta.env.VITE_API_BASE_URL

async function submitForm() {
  try {
    await axios.post(`${baseUrl}/updatePayMethodDetails`, form)
    emit('saved')
  } catch (err) {
    console.error('Kunne ikke lagre kort:', err)
  }
}
</script>

<style scoped>
.news {
  column-count: 2;
  column-gap: 1rem;
}
.card-form {
  max-width: 600px;
  margin: 1rem auto;
  display: grid;
  gap: 0.75rem;
}
label { display: block; margin-bottom: 0.25rem; }
input, select { width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px; }
.form-buttons { display: flex; gap: 0.5rem; margin-top: 1rem; }
button { padding: 0.5rem 1rem; cursor: pointer; }
</style>

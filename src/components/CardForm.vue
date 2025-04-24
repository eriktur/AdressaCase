<template>
  <form @submit.prevent="submitForm" class="card-form">
  <h2>Legg til nytt kort</h2>

    <div>
      <input
          id="cardDetails"
          v-model="form.cardDetails"
          type="text"
          required
          title="Kortnummer må være 16 siffer"
          placeholder="Kortnummer (16 siffer)"
      />
    </div>

    <div>
      <input
          id="expiryDate"
          v-model="form.expiryDate"
          type="text"
          required
          title="Skriv inn gyldig dato på formatet MM/ÅÅ"
          placeholder="Utløpsdato (MM/ÅÅ)"
      />
    </div>

    <div>
      <input
          id="CVV"
          v-model="form.CVV"
          type="password"
          required
          title="CVV må være 3 siffer"
          placeholder="CVV (3 siffer)"
      />
    </div>

    <div>
      <select id="issuer" v-model="form.issuer" required>
        <option disabled value="">Velg kort</option>
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
import { addCard } from '../services/cardService'

const emit = defineEmits(['saved', 'cancel'])
const form = reactive({
  currency: 'NOK',
  cardDetails: '',
  expiryDate: '',
  CVV: '',
  issuer: ''
})

async function submitForm() {
  try {
    await addCard(form)
    emit('saved')
  } catch (err) {
    console.error('Kunne ikke lagre kort:', err)
  }
}
</script>



<style scoped>
.card-form {
  min-width: 400px;
  max-width: 700px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #fefefe;
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  box-sizing: border-box;
}

.card-form h2 {
  margin-bottom: 1rem;
  color: #1e1e2f;
}

.card-form label {
  display: block;
  margin-bottom: 0.25rem;
  font-weight: 500;
  color: #333;
}

.card-form input,
.card-form select {
  width: 80%;
  padding: 0.6rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  background-color: #ffffff;
  color: #000000;
  transition: border-color 0.2s;
}


.card-form input:focus,
.card-form select:focus {
  border-color: #3a3a3a;
  outline: none;
}

.form-buttons {
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
}

.form-buttons button {
  background-color: #3a3a3a;
  border: none;
  border-radius: 6px;
  color: #ffffff;
  font-size: 1rem;
  padding: 0.6rem 1.2rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.form-buttons button:hover {
  background-color: #545454;
}

</style>

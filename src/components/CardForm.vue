<template>
  <form @submit.prevent="submitForm" class="card-form">
    <h2>Legg til nytt kort</h2>

    <div>
      <input
          id="cardDetails"
          v-model="form.cardDetails"
          type="text"
          placeholder="Kortnummer (16 siffer)"
          maxlength="16"
          @input="onCardInput"
          @blur="validateCardNumber"
      />
      <p v-if="errors.cardDetails" class="error">{{ errors.cardDetails }}</p>
    </div>

    <div>
      <input
          id="expiryDate"
          v-model="form.expiryDate"
          type="text"
          placeholder="Utløpsdato (MM/ÅÅ)"
          maxlength="5"
          @input="onExpiryInput"
          @blur="validateExpiryDate"
      />
      <p v-if="errors.expiryDate" class="error">{{ errors.expiryDate }}</p>
    </div>

    <div>
      <input
          id="CVV"
          v-model="form.CVV"
          type="password"
          placeholder="CVV (3 siffer)"
          maxlength="3"
          @input="onCvvInput"
          @blur="validateCVV"
      />
      <p v-if="errors.CVV" class="error">{{ errors.CVV }}</p>
    </div>

    <div>
      <select
          id="issuer"
          v-model="form.issuer"
          @change="validateIssuer"
      >
        <option disabled value="">Velg kort</option>
        <option>VISA</option>
        <option>MASTERCARD</option>
        <option>AMEX</option>
      </select>
      <p v-if="errors.issuer" class="error">{{ errors.issuer }}</p>
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
const errors = reactive({
  cardDetails: '',
  expiryDate: '',
  CVV: '',
  issuer: ''
})

function onCardInput() {
  form.cardDetails = form.cardDetails.replace(/\D/g, '').slice(0, 16)
  validateCardNumber()
}

function onExpiryInput() {
  let digits = form.expiryDate.replace(/\D/g, '').slice(0, 4)
  if (digits.length > 2) {
    form.expiryDate = digits.slice(0, 2) + '/' + digits.slice(2)
  } else {
    form.expiryDate = digits
  }
}

function validateCardNumber() {
  if (!form.cardDetails) {
    errors.cardDetails = 'Kortnummer må fylles ut.'
  } else if (form.cardDetails.length !== 16) {
    errors.cardDetails = 'Kortnummer må være 16 siffer.'
  } else {
    errors.cardDetails = ''
  }
}

function validateExpiryDate() {
  if (!form.expiryDate) {
    errors.expiryDate = 'Skriv inn en gyldig dato.'
    return
  }
  const match = /^([0][1-9]|1[0-2])\/(\d{2})$/.exec(form.expiryDate)
  if (!match) {
    errors.expiryDate = 'Skriv inn en gyldig dato.'
    return
  }
  const month = parseInt(match[1], 10)
  const year = parseInt(match[2], 10) + 2000
  const now = new Date()
  const exp = new Date(year, month - 1, 1)
  exp.setMonth(exp.getMonth() + 1)
  exp.setDate(0)

  if (exp < now) {
    errors.expiryDate = 'Kortet er utløpt.'
  } else {
    errors.expiryDate = ''
  }
}

function onCvvInput() {
  form.CVV = form.CVV.replace(/\D/g, '').slice(0, 3)
}

function validateCVV() {
  if (!form.CVV) {
    errors.CVV = 'CVV må fylles ut.'
  } else if (form.CVV.length !== 3) {
    errors.CVV = 'CVV må være 3 siffer.'
  } else {
    errors.CVV = ''
  }
}

function validateIssuer() {
  if (!form.issuer) {
    errors.issuer = 'Du må velge korttype.'
  } else {
    errors.issuer = ''
  }
}

async function submitForm() {
  validateCardNumber()
  validateExpiryDate()
  validateCVV()
  validateIssuer()
  if (errors.cardDetails || errors.expiryDate || errors.CVV || errors.issuer) {
    return
  }
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
  gap: 1rem;
  margin-top: 1rem;
  justify-content: flex-start;
}


.form-buttons button {
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  padding: 0.6rem 1.2rem;
  cursor: pointer;
  transition: background-color 0.2s;
}


.form-buttons button[type="submit"] {
  background-color: #208620;
  color: white;
}

.form-buttons button[type="submit"]:hover {
  background-color: #1b6e1b;
}

.form-buttons button[type="button"] {
  background-color: #d3d3d3;
  color: #333;
}

.form-buttons button[type="button"]:hover {
  background-color: #bcbcbc;
}

.error {
  color: red;
  margin-top: 0.25rem;
  font-size: 0.875rem;
}
</style>
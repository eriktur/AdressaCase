  <template>
    <div class="card-list news">
      <h2>Valgt betalingsmetode:</h2>
      <div v-if="selectedCard" class="card-item selected">
        <div class="card-mask">
          <strong>{{ selectedCard.issuer }}</strong> •••• {{ selectedCard.cardDetails.toString().slice(-4) }}
        </div>
        <div class="card-expiry">Utløpsdato: {{ selectedCard.expiryDate }}</div>
        <div class="card-actions">
          <button class="danger-btn" @click="confirmDelete = true">Slett</button>
        </div>
      </div>

      <div v-else class="no-card-selected">
        Ingen betalingsmåter valgt.
      </div>

      <div v-if="showOtherCards">
        <template v-if="otherCards.length > 0">
          <h3>Andre tilgjengelige betalingsmetoder:</h3>
          <ul>
            <li
                v-for="card in otherCards"
                :key="card.id"
                class="card-item"
            >
              <div class="card-mask">
                <strong>{{ card.issuer }}</strong> •••• {{ card.cardDetails.toString().slice(-4) }}
              </div>
              <div class="card-expiry">Utløpsdato: {{ card.expiryDate }}</div>
              <div class="card-actions">
                <button @click="selectCard(card)">Velg</button>
                <button @click="deleteCard(card.id)">Slett</button>
              </div>
            </li>
          </ul>
        </template>
        <template v-else>
          <p class="no-other-cards">Ingen andre betalingsmetoder tilgjengelig.</p>
        </template>
      </div>


      <button class="add-card-btn" @click="$emit('show-form')">Legg til nytt kort</button>
      <button
          class="change-method-text"
          @click="showOtherCards = !showOtherCards"
          type="button"
      >
        {{ showOtherCards ? 'Skjul andre betalingsmetoder' : 'Endre betalingsmåte' }}
      </button>

    </div>
    <div v-if="confirmDelete" class="modal-overlay">
      <div class="modal">
        <p>Er du sikker på at du vil slette ditt aktive kort?</p>
        <div class="modal-buttons">
          <button class="danger-btn" @click="confirmDeleteAndDeleteCard">Ja, slett</button>
          <button @click="confirmDelete = false">Avbryt</button>
        </div>
      </div>
    </div>


  </template>


  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import { getCards, deleteCard as deleteCardService } from '../services/cardService.js'

  const confirmDelete = ref(false)
  const cards = ref([])
  const selectedCard = ref(null)
  const showOtherCards = ref(false)

  async function fetchCards() {
    try {
      const res = await getCards()
      cards.value = res.data
      if (!selectedCard.value && cards.value.length > 0) {
        selectedCard.value = cards.value[0]
      }
    } catch (err) {
      console.error('Kunne ikke hente kort:', err)
    }
  }

  function confirmDeleteAndDeleteCard() {
    if (selectedCard.value) {
      deleteCard(selectedCard.value.id)
      confirmDelete.value = false
    }
  }

  function selectCard(card) {
    selectedCard.value = card
    showOtherCards.value = false
  }

  async function deleteCard(id) {
    try {
      await deleteCardService(id)
      cards.value = cards.value.filter(card => card.id !== id)

      if (selectedCard.value && selectedCard.value.id === id) {
        selectedCard.value = cards.value[0] || null
      }
    } catch (err) {
      console.error('Kunne ikke slette kort:', err)
    }
  }

  const otherCards = computed(() =>
      cards.value.filter(card => card.id !== selectedCard.value?.id)
  )

  onMounted(fetchCards)
  </script>

  <style scoped>
  .card-list {
    min-width: 400px;
    max-width: 700px;
    margin: 2rem auto;
    padding: 1.5rem;
    background-color: #fefefe;
    border-radius: 16px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  }

  .card-list ul {
    list-style: none;
    padding-left: 0;
    margin: 0;
  }

  .card-list h2 {
    margin-bottom: 1rem;
    color: #1e1e2f;
    border-bottom: 2px solid #989898;
  }

  .card-list h3 {
    margin-bottom: 1rem;
    color: #1e1e2f;
  }

  .card-item {
    background-color: #ffffff;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1rem;
    transition: box-shadow 0.2s ease;
  }

  .card-item:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
  }

  .card-item.selected {
    border: 2px solid #4caf50;
    background-color: #eafbea;
  }

  .card-mask,
  .card-expiry {
    margin-bottom: 0.5rem;
    font-size: 1rem;
    color: #333;
  }

  .card-actions {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-top: 0.5rem;
  }

  .card-actions button {
    background-color: #3a3a3a;
    color: white;
    border: none;
    border-radius: 6px;
    padding: 0.4rem 0.75rem;
    font-size: 0.9rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .card-actions button:hover {
    background-color: #545454;
  }

  .add-card-btn {
    background-color: #208620;
    color: #ffffff;
    margin-top: 1rem;
    padding: 0.6rem 1.2rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .add-card-btn:hover {
    background-color: #45a047;
  }

  .no-card-selected {
    padding: 1rem;
    margin-bottom: 1rem;
    background-color: #fff4f4;
    color: #a33;
    text-align: center;
    border: 1px dashed #e0b4b4;
    border-radius: 8px;
    font-style: italic;
  }

  .no-other-cards {
    color: #666;
    font-style: italic;
    text-align: center;
    margin-top: 1rem;
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
  }

  .modal {
    background: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    max-width: 400px;
    text-align: center;
    color: #000;
  }

  .modal-buttons {
    display: flex;
    gap: 0.75rem;
    justify-content: center;
    margin-top: 1rem;
  }


  .modal-buttons button {
    background-color: #3a3a3a;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .modal-buttons button:hover {
    background-color: #545454;
  }

  .danger-btn {
    background-color: #e53935;
    color: white;
  }

  .danger-btn:hover {
    background-color: #c62828;
  }

  .change-method-text {
    margin-top: 0.5rem;
    color: #3573bb;
    background: none;
    border: none;
    font: inherit;
    text-decoration: underline;
    cursor: pointer;
    text-align: center;
    transition: color 0.2s;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  .change-method-text:hover {
    color: #3f7ecb;
  }

  </style>

import apiClient from '../utils/axiosSetup.js'

export const getCards = () => apiClient.get('/updatePayMethodDetails')
export const addCard = (card) => apiClient.post('/updatePayMethodDetails', card)
export const deleteCard = (id) => apiClient.delete(`/updatePayMethodDetails/${id}`)

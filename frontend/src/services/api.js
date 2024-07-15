import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',// URL base da sua API
  headers: {
    'Content-Type': 'application/json'
  }
});

export default {
  getContracts() {
    return apiClient.get('/contracts');
  },
  getContract(id) {
    return apiClient.get(`/contracts/${id}`);
  },
  createContract(contract) {
    return apiClient.post('/contracts', contract, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  updateContract(id, contract) {
    return apiClient.put(`/contracts/${id}`, contract, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  deleteContract(id) {
    return apiClient.delete(`/contracts/${id}`);
  }
};

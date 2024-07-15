<template>
  <div class="list-container">
    <h1>Contracts</h1>
    <ul>
      <li v-for="contract in contracts" :key="contract.id">
        <span>{{ contract.name }}</span>
        <div class="actions">
          <router-link :to="{ name: 'EditContract', params: { id: contract.id } }" class="edit-button">Edit</router-link>
          <button @click="deleteContract(contract.id)" class="delete-button">Delete</button>
        </div>
        <p v-if="contract.preview" class="preview">{{ contract.preview }}</p>
        <p v-if="contract.file_path">Download File: <a :href="getFileUrl(contract.file_path)" target="_blank">Download PDF</a></p>
      </li>
    </ul>
    <router-link to="/create" class="create-button">Create New Contract</router-link>
  </div>
</template>

<script>
import api from '@/services/api';

export default {
  data() {
    return {
      contracts: []
    };
  },
  async created() {
    this.fetchContracts();
  },
  methods: {
    async fetchContracts() {
      try {
        const response = await api.getContracts();
        this.contracts = response.data;
      } catch (error) {
        console.error('Error fetching contracts:', error);
      }
    },
    async deleteContract(id) {
      try {
        await api.deleteContract(id);
        this.fetchContracts(); // Refresh the list after deletion
      } catch (error) {
        console.error('Error deleting contract:', error);
      }
    },
    getFileUrl(filePath) {
      return `http://localhost:3000/${filePath}`;
    }
  }
};
</script>

<style scoped>
.list-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
h1 {
  text-align: center;
  margin-bottom: 20px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
  padding: 10px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
.actions {
  display: flex;
  gap: 10px;
}
.edit-button,
.delete-button {
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.edit-button {
  background-color: #007bff;
  color: white;
}
.edit-button:hover {
  background-color: #0056b3;
}
.delete-button {
  background-color: #ff4d4d;
  color: white;
}
.delete-button:hover {
  background-color: #cc0000;
}
.create-button {
  display: block;
  width: 100%;
  padding: 10px;
  text-align: center;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  margin-top: 20px;
}
.create-button:hover {
  background-color: #0056b3;
}
.preview {
  margin-top: 10px;
  color: #555;
  font-size: 14px;
  background: #f4f4f4;
  padding: 10px;
  border-radius: 5px;
  width: 100%;
}
</style>

<template>
  <div>
    <h1>Create Contract</h1>
    <form @submit.prevent="createContract" enctype="multipart/form-data">
      <div>
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="contract.name" required />
      </div>
      <div>
        <label for="signed_date">Signed Date:</label>
        <input type="date" id="signed_date" v-model="contract.signed_date" required />
      </div>
      <div>
        <label for="valid_until">Valid Until:</label>
        <input type="date" id="valid_until" v-model="contract.valid_until" required />
      </div>
      <div>
        <label for="parties_involved">Parties Involved:</label>
        <input type="text" id="parties_involved" v-model="contract.parties_involved" required />
      </div>
      <div>
        <label for="summary">Summary:</label>
        <textarea id="summary" v-model="contract.summary" required></textarea>
      </div>
      <div>
        <label for="contract_file">Contract File:</label>
        <input type="file" id="contract_file" @change="handleFileUpload" required />
      </div>
      <button type="submit">Create Contract</button>
    </form>

    <h2>Contracts List</h2>
    <ul>
      <li v-for="contract in contracts" :key="contract.id">
        <router-link :to="{ name: 'ContractDetails', params: { id: contract.id } }">
          <p><strong>Name:</strong> {{ contract.name }}</p>
          <p><strong>Signed Date:</strong> {{ contract.signed_date }}</p>
          <p><strong>Valid Until:</strong> {{ contract.valid_until }}</p>
          <p><strong>Parties Involved:</strong> {{ contract.parties_involved }}</p>
          <p><strong>Summary:</strong> {{ contract.summary }}</p>
          <p><strong>File:</strong> <a :href="contract.file_path" target="_blank">Download PDF</a></p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  data() {
    return {
      contract: {
        name: '',
        signed_date: '',
        valid_until: '',
        parties_involved: '',
        summary: ''
      },
      contractFile: null,
      contracts: []
    };
  },
  methods: {
    handleFileUpload(event) {
      this.contractFile = event.target.files[0];
    },
    async createContract() {
      try {
        const formData = new FormData();
        formData.append('name', this.contract.name);
        formData.append('signed_date', this.contract.signed_date);
        formData.append('valid_until', this.contract.valid_until);
        formData.append('parties_involved', this.contract.parties_involved);
        formData.append('summary', this.contract.summary);
        if (this.contractFile) {
          formData.append('contract', this.contractFile);
        }

        const response = await api.createContract(formData);
        console.log('Contract created:', response.data);
        this.fetchContracts();

        this.contract = {
          name: '',
          signed_date: '',
          valid_until: '',
          parties_involved: '',
          summary: ''
        };
        this.contractFile = null;
        document.getElementById('contract_file').value = null;
      } catch (error) {
        console.error('Error creating contract:', error);
      }
    },
    async fetchContracts() {
      try {
        const response = await api.getContracts();
        this.contracts = response.data;
      } catch (error) {
        console.error('Error fetching contracts:', error);
      }
    }
  },
  created() {
    this.fetchContracts();
  }
};
</script>

<style scoped>
#app {
  text-align: center;
  margin-top: 50px;
}

form {
  display: inline-block;
  text-align: left;
}

form div {
  margin-bottom: 10px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input,
textarea {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

button {
  display: block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  background: #f9f9f9;
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
  text-align: left;
}

li p {
  margin: 5px 0;
}
</style>

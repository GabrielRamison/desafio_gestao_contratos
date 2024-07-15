<template>
  <div class="form-container">
    <h2 v-if="contractId">Edit Contract</h2>
    <h2 v-else>Create Contract</h2>
    <form @submit.prevent="saveContract">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="contract.name" required>
      </div>
      <div class="form-group">
        <label for="signedDate">Signed Date:</label>
        <input type="date" id="signedDate" v-model="formattedSignedDate" required>
      </div>
      <div class="form-group">
        <label for="validUntil">Valid Until:</label>
        <input type="date" id="validUntil" v-model="formattedValidUntil" required>
      </div>
      <div class="form-group">
        <label for="partiesInvolved">Parties Involved:</label>
        <input type="text" id="partiesInvolved" v-model="contract.parties_involved" required>
      </div>
      <div class="form-group">
        <label for="summary">Summary:</label>
        <textarea id="summary" v-model="contract.summary" required></textarea>
      </div>
      <div class="form-group">
        <label for="file">Upload Contract (PDF):</label>
        <input type="file" id="file" @change="handleFileUpload" :required="!contractId">
        <p v-if="contract.file_path">Current File: <a :href="contract.file_path" target="_blank">Download PDF</a></p>
      </div>
      <div class="form-group">
        <button type="submit">{{ contractId ? 'Update' : 'Save' }} Contract</button>
        <button type="button" @click="deleteContract" v-if="contractId">Delete Contract</button>
        <router-link to="/" class="back-button">Back to List</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import api from '@/services/api';
import { format, parseISO } from 'date-fns';

export default {
  data() {
    return {
      contract: {
        name: '',
        signed_date: '',
        valid_until: '',
        parties_involved: '',
        summary: '',
        file_path: ''
      },
      file: null,
      contractId: null,
      formattedSignedDate: '',
      formattedValidUntil: ''
    };
  },
  async created() {
    this.contractId = this.$route.params.id;
    if (this.contractId) {
      try {
        const response = await api.getContract(this.contractId);
        this.contract = response.data;
        this.formattedSignedDate = format(parseISO(this.contract.signed_date), 'yyyy-MM-dd');
        this.formattedValidUntil = format(parseISO(this.contract.valid_until), 'yyyy-MM-dd');
      } catch (error) {
        console.error('Error fetching contract:', error);
      }
    }
  },
  methods: {
    handleFileUpload(event) {
      this.file = event.target.files[0];
    },
    async saveContract() {
      try {
        const formData = new FormData();
        formData.append('name', this.contract.name);
        formData.append('signed_date', this.formattedSignedDate);
        formData.append('valid_until', this.formattedValidUntil);
        formData.append('parties_involved', this.contract.parties_involved);
        formData.append('summary', this.contract.summary);
        if (this.file) {
          formData.append('contract', this.file);
        }

        if (this.contractId) {
          await api.updateContract(this.contractId, formData);
        } else {
          await api.createContract(formData);
        }
        this.$router.push('/');
      } catch (error) {
        console.error('Error saving contract:', error);
      }
    },
    async deleteContract() {
      try {
        await api.deleteContract(this.contractId);
        this.$router.push('/');
      } catch (error) {
        console.error('Error deleting contract:', error);
      }
    }
  }
};
</script>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.form-group {
  margin-bottom: 15px;
}
label {
  display: block;
  margin-bottom: 5px;
}
input[type="text"],
input[type="date"],
textarea {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
}
button:hover {
  background-color: #0056b3;
}
.back-button {
  display: block;
  text-align: center;
  background-color: #6c757d;
  color: white;
  padding: 10px;
  border-radius: 5px;
  text-decoration: none;
}
.back-button:hover {
  background-color: #5a6268;
}
</style>

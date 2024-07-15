<!-- <template>
    <div v-if="contract">
      <h1>Contract Details</h1>
      <p><strong>Name:</strong> {{ contract.name }}</p>
      <p><strong>Signed Date:</strong> {{ contract.signed_date }}</p>
      <p><strong>Valid Until:</strong> {{ contract.valid_until }}</p>
      <p><strong>Parties Involved:</strong> {{ contract.parties_involved }}</p>
      <p><strong>Summary:</strong> {{ contract.summary }}</p>
      <p><strong>PDF Summary:</strong> {{ contract.pdf_summary }}</p>
      <p><strong>File:</strong> <a :href="contract.file_path" target="_blank">Download PDF</a></p>
      <router-link to="/">Back to List</router-link>
    </div>
    <div v-else>
      <p>Loading contract details...</p>
    </div>
  </template>
  
  <script>
  import api from '../services/api';
  
  export default {
    data() {
      return {
        contract: null
      };
    },
    async created() {
      this.fetchContracts();
    },
    methods: {
      async fetchContracts() {
      const contractId = this.$route.params.id;
      try {
        const response = await api.getContract(contractId);
        this.contract = response.data;
      } catch (error) {
        console.error('Error fetching contract details:', error);
      }
    }
    }
  };
  </script> -->
  
  <template>
    <div class="list-container">
      <h1>Contracts</h1>
      <ul>
        <li v-for="contract in contracts" :key="contract.id">
          <router-link :to="{ name: 'ContractDetails', params: { id: contract.id } }">
            <span>{{ contract.name }}</span>
          </router-link>
          <div class="actions">
            <router-link :to="{ name: 'EditContract', params: { id: contract.id } }" class="edit-button">Edit</router-link>
            <button @click="deleteContract(contract.id)" class="delete-button">Delete</button>
          </div>
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
      }
    }
  };
  </script>
  <style scoped>
  h1 {
    margin-bottom: 20px;
  }
  
  p {
    margin: 10px 0;
  }
  
  a {
    color: #4CAF50;
    text-decoration: none;
  }
  
  a:hover {
    text-decoration: underline;
  }
  </style>
  
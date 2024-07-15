<template>
    <div>
      <h1>Contract Details</h1>
      <ContractDetails :id="$route.params.id" />
    </div>
  </template>
  
  <script>
  import ContractDetails from '@/components/ContractDetails.vue';
  
  export default {
    components: {
      ContractDetails
    },
    props: {
      id: {
        type: String,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  /* Estilos específicos dos detalhes do contrato */
  </style>
  
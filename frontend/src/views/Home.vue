<template>
  <div class="home-container">
    <h1>Contract Management</h1>
    <ContractList />
  </div>
</template>

<script>
import ContractList from '@/components/ContractList.vue';

export default {
  components: {
    ContractList
  }
};
</script>

<style scoped>
.home-container {
  text-align: center;
}
h1 {
  margin-bottom: 20px;
}
</style>

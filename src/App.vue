<script setup lang="ts">
import { ref, computed } from 'vue';
import { City } from './types';
import useFetch from './composables/useFetch';
import SearchInput from './components/SearchInput.vue';
import SuggestionsList from './components/SuggestionsList.vue';

const searchTerm = ref('');
const { data: cities, error } = useFetch<City>('/data.json');

const filteredCities = computed(() => {
  return cities.value.filter(city =>
    city.city.toLowerCase().includes(searchTerm.value.toLowerCase()) || 
    city.state.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});
</script>

<template>
  <div class="app">
    <img src="./assets/logo.svg" alt="Populook" />
    <SearchInput v-model="searchTerm" />
    <p v-if="error" class="error">{{ error }}</p>
    <SuggestionsList v-else-if="searchTerm" :cities="filteredCities" :searchTerm="searchTerm" />
    <p v-else>Welcome to Populook! Enter a city or state name to find its population.</p>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap');
@import './styles.css';

.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
  margin: auto;
  padding: 20px;

  .error {
    color: #ff0000;
  }
}
</style>

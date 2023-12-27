<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { City } from './types';
import SearchInput from './components/SearchInput.vue';
import SuggestionsList from './components/SuggestionsList.vue';

const cities = ref<City[]>([]);
const searchTerm = ref('');

onMounted(async () => {
  const result = await axios('https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json');
  cities.value = result.data;
});

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
    <div v-if="searchTerm">
      <SuggestionsList :cities="filteredCities" :searchTerm="searchTerm" />
    </div>
    <div v-else>
      <p>Welcome to Populook! Enter a city or state name to find its population.</p>
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap');
@import './global.css';

.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
  margin: auto;
  padding: 20px;
}
</style>

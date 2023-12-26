<template>
  <ul class="suggestions-list">
    <li v-for="city in cities" :key="city.rank">
      <span class="name" v-html="highlightMatch(city.city, searchTerm) + ', ' + highlightMatch(city.state, searchTerm)"></span>
      <span class="population">{{ city.population }}</span>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

interface City {
  rank: number;
  city: string;
  state: string;
  population: string;
}

defineProps<{
  cities: City[];
  searchTerm: string;
}>();

const highlightMatch = (text: string, searchTerm: string) => {
  const regex = new RegExp(searchTerm, 'gi');
  return text.replace(regex, match => `<span class="highlight">${match}</span>`);
};
</script>

<style scoped>
.suggestions-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.suggestions-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  margin: 0;
  padding: 20px;
  border-top: 2px solid var(--bgColor);
  font-size: 24px;
}

.suggestions-list >>> .highlight {
  background: #ffdc8a;
}

.name {
  font-weight: bold;
}

.population {
  font-size: 18px;
  color: #666;
}

/* Mobile styles */

@media (max-width: 600px) {
  .suggestions-list li {
    flex-direction: column;
  }

  .name,
  .population {
    text-align: center;
    width: 100%;
  }
}
</style>

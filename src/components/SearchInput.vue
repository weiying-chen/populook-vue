<script setup lang="ts">
defineProps({
  modelValue: String
});

const emit = defineEmits(['update:modelValue']);

const handleInput = (event: Event) => {
  const input = event.target as HTMLInputElement;
  emit('update:modelValue', input.value);
};
</script>

<template>
  <input
    type="text"
    :value="modelValue"
    @input="handleInput"
    placeholder="City or State"
    class="search-input"
  />
</template>

<style scoped>
.search-input {
  width: 100%;
  padding: 20px;
  font-family: "Nunito", sans-serif;
  font-size: 20px;
  border: 2px solid var(--fgColor);
  box-sizing: border-box;
  border-radius: 0;
}

.search-input:focus {
  border-radius: 0;
  outline: none;
}
</style>

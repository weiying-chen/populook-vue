import { ref, onMounted } from 'vue';
import axios from 'axios';

function useFetch<T>(dataUrl: string) {
  const data = ref<T[]>([]);
  const error = ref<string | null>(null);

  const fetchData = async () => {
    try {
      const cachedData = localStorage.getItem('cachedData');
      if (cachedData) {
        data.value = JSON.parse(cachedData);
        error.value = null;
      } else {
        const result = await axios.get(dataUrl);

        if (result.status === 200 && Array.isArray(result.data)) {
          data.value = result.data;
          error.value = null;
          localStorage.setItem('cachedData', JSON.stringify(result.data));
        } else {
          throw new Error('Oops! Something went wrong while trying to fetch the data. Please try again later.');
        }
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An unknown error occurred.';
    }
  };

  onMounted(() => {
    fetchData();
  });

  return { data, error };
}

export default useFetch;

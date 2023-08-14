import axios from 'axios';

const fetchCountriesList = async () => {
  try {
    const response = await axios.get('https://restcountries.com/v2/all');
    return response.data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    return [];
  }
};

export default fetchCountriesList;

import axios from 'axios';
import type { CountryBasic, CountryDetail } from '@/types';

const api = axios.create({
  baseURL: 'https://restcountries.com/v3.1',
  timeout: 10000,
});

const getAllCountries = async () => {
  const { data } = await api.get<CountryBasic[]>('/all', {
    params: { fields: 'name,flags' },
  });

  return [...data].sort((a, b) =>
    a.name.common.localeCompare(b.name.common)
  );
}

const getCountryByName = async (name: string) => {
  const decoded = decodeURIComponent(name).replace(/-/g, ' ');

  const { data } = await api.get<CountryDetail[]>(`/name/${encodeURIComponent(decoded)}`, {
    params: { fields: 'name,flags,capital,region,subregion,population,languages' },
  });

  const match =
    data.find(
      (c) => c.name.common.toLowerCase().replace(/\s+/g, '-') === name.toLowerCase()
    ) ?? data[0];

  return match;
}

export { getAllCountries, getCountryByName };